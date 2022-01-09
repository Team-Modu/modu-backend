import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccountsService } from 'src/accounts/accounts.service';
import { EnvironmentVariables } from 'src/app.interfaces';
import { IRequest } from 'src/common/common.interfaces';
import { Account } from 'src/database/entities/account.entity';
import { AccessTokenPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly jwtService: JwtService,
    private readonly accountsService: AccountsService,
  ) {}

  async validateAccount(userId: string, password: string) {
    const account = await this.accountsService.getAccountByOptions({
      where: {
        userId,
      },
      select: [
        'createdAt',
        'hashedPassword',
        'id',
        'updatedAt',
        'userId',
        'username',
        'role',
        'refreshToken',
      ],
    });
    if (!account) {
      throw new UnauthorizedException();
    }
    const isPasswordMatched = await account.checkPassword(password);
    if (account && isPasswordMatched) {
      delete account.hashedPassword;
      return account;
    }
    return null;
  }

  async login(account: Account, res: Response) {
    const accessToken = await this.jwtService.signAsync({ id: account.id });
    res.cookie(this.configService.get<string>('ACCESS_TOKEN'), accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),
      signed: true,
      secure: this.configService.get<string>('COOKIE_IS_HTTPS') === 'true',
      path: '/',
    });
    return;
  }

  logout(res: Response) {
    res.clearCookie(this.configService.get<string>('ACCESS_TOKEN'));
  }

  async verifyJwt(token: string): Promise<AccessTokenPayload> {
    return this.jwtService.verifyAsync(token);
  }

  extractAccessTokenFromCookie(req: IRequest): string | null {
    console.log(req.signedCookies);
    if (
      req &&
      req.signedCookies &&
      req.signedCookies[process.env.ACCESS_TOKEN]
    ) {
      return req.signedCookies[process.env.ACCESS_TOKEN];
    }
    return null;
  }
}
