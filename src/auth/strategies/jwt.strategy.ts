import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { IRequest } from 'src/common/common.interfaces';
import { Account } from 'src/database/entities/account.entity';
import { AccessTokenPayload } from '../auth.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountsService: AccountsService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: IRequest) => req.signedCookies[process.env.ACCESS_TOKEN],
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }
  async validate({ id }: AccessTokenPayload): Promise<Account> {
    return await this.accountsService.getAccount(id, {
      select: [
        'id',
        'userId',
        'hashedPassword',
        'username',
        'role',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
