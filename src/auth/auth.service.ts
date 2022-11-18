import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@app/users/dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@app/prisma';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { AuthTokens, UserProfile } from './dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async localLogin(userId: number, userEmail: string): Promise<AuthTokens> {
    const tokens = await this.getTokens(userId, userEmail);
    return tokens;
  }

  async refreshJwt(userId: number, refreshToken: string): Promise<AuthTokens> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.refreshToken) throw new ForbiddenException('Access Denied');

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    return tokens;
  }

  async hashValue(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }

  async getTokens(userId: number, email: string): Promise<AuthTokens> {
    const jwtPayload: any = {
      sub: userId,
      email: email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '20m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    await this.syncRefreshToken(userId, refresh_token);
    return { access_token, refresh_token };
  }

  async syncRefreshToken(userId: number, refreshToken: string): Promise<void> {
    try {
      const hashRt = await this.hashValue(refreshToken);
      await this.prisma.user.update({
        where: { id: userId },
        data: { refreshToken: hashRt },
      });
    } catch (error) {
      this.logger.error('Unable to sync refresh token to database:::', error);
      throw new InternalServerErrorException();
    }
  }

  async logout(userId: number): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: { not: null },
      },
      data: { refreshToken: null },
    });
    return true;
  }

  async signup(newUserData: CreateUserDto) {
    const password = await this.hashValue(newUserData.password);

    const user = await this.prisma.user.create({
      data: {
        ...newUserData,
        role: 'SUBSCRIBER',
        password,
        jobLists: {
          createMany: {
            data: [
              { label: 'Queue', order: 1 },
              { label: 'Applied', order: 2 },
              { label: 'Interview', order: 3 },
              { label: 'Offer', order: 4 },
            ],
          },
        },
      },
    });

    const tokens = await this.getTokens(user.id, user.email);
    return tokens;
  }

  async getUserProfile(userId: number): Promise<UserProfile> {
    const profile = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return new UserProfile(profile);
  }

  async registerAdmin(userId: number, adminKey: string): Promise<UserProfile> {
    const existingAdminUser = await this.prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    const noAdminRegistered = existingAdminUser === null;
    if (!noAdminRegistered) throw new Error('Admin already registered');

    const expectedAdminKey =
      this.configService.get<string>('ADMIN_REGISTER_KEY');

    const validAdminKey = expectedAdminKey === adminKey;
    if (!validAdminKey) throw new Error('Invalid admin key');

    const adminUser = await this.prisma.user.update({
      data: { role: 'ADMIN' },
      where: { id: userId },
    });

    return new UserProfile(adminUser);
  }
}
