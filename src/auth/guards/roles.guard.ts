import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { ROLES_KEY } from '../auth.constants';
import { AllowedRoles } from '../auth.interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    // private readonly commonService: CommonService,
    private readonly authService: AuthService,
    private readonly accountsService: AccountsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const token = this.authService.extractAccessTokenFromCookie(
      context.switchToHttp().getRequest(),
    );
    if (token) {
      const payload = await this.authService.verifyJwt(token);
      const account = await this.accountsService.getAccount(payload.id);
      if (account) {
        if (roles.includes('Any')) {
          return true;
        }
        return roles.includes(account.role);
      }
    }
    return false;
  }
}
