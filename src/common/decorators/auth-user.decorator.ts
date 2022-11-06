import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '@app/auth/types';

// /** Extracts authorized user jwt payload data. */
export const AuthUser = createParamDecorator(
  (
    data: keyof JwtPayload | 'id' | undefined,
    context: ExecutionContext,
  ): JwtPayload => {
    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request;
    return data ? user[data] : user;
  },
);
