import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequest } from './common.interfaces';

export const AccountCtx = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext) => {
    // console.log();
    console.log(ctx.switchToHttp().getRequest<IRequest>());
    const account = ctx.switchToHttp().getRequest<IRequest>().user;
    console.log(account);
    delete account.hashedPassword;
    return account;
  },
);
