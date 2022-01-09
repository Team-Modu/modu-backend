import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Account } from 'src/database/entities/account.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: process.env.USERNAME_FIELD,
      passwordField: process.env.PASSWORD_FIELD,
    });
  }

  async validate(userId: string, password: string): Promise<Account> {
    const account = await this.authService.validateAccount(userId, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
