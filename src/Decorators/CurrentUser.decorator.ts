// https://docs.nestjs.com/custom-decorators#passing-data
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUser } from 'src/Models/user.model';
import { ICurrentUserWithRt } from 'src/auth/types';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): ICurrentUser | ICurrentUserWithRt => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    console.log('CurrentUser: user', user);

    return data ? user?.[data] : user;
  },
);
