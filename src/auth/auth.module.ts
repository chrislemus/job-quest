import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@app/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from './strategies';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './jwt.module';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule.forRoot(), JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
