import { Role } from 'src/database/constants/account.constants';

export interface AccessTokenPayload {
  id: string;
  iat: number;
}

export type AllowedRoles = keyof typeof Role | 'Any';
