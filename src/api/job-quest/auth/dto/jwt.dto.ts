import { IsString } from 'class-validator';

export class JWT {
  @IsString()
  accessToken: string;
  @IsString()
  refreshToken: string;
}
