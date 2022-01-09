import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/role.decorator';
import { AccountCtx } from 'src/common/common.decorator';
import { IRequest } from 'src/common/common.interfaces';
import { Role } from 'src/database/constants/account.constants';
import { Account } from 'src/database/entities/account.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('accounts')
@ApiTags('계정')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @Roles(Role.Driver, Role.User)
  @UseGuards(RolesGuard)
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.createAccount(createAccountDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: IRequest, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user, res);
  }

  @Post('logout')
  @Roles('Any')
  @UseGuards(RolesGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Post('auth')
  @Roles('Any')
  @UseGuards(RolesGuard, JwtAuthGuard)
  async authorizeAccount(@AccountCtx() account: Account) {
    return account;
  }
}
