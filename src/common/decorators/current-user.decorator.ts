import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInfo } from '../interfaces/user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserInfo => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserInfo;
  },
);
