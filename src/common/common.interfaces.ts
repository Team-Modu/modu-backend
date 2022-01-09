import { Request } from 'express';
import { Account } from 'src/database/entities/account.entity';

export interface IRequest extends Request {
  user: Account;
}
