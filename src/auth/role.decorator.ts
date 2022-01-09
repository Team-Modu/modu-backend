import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/database/constants/account.constants';
import { ROLES_KEY } from './auth.constants';

export const Roles = (...roles: Role[] | ['Any']) =>
  SetMetadata(ROLES_KEY, roles);
