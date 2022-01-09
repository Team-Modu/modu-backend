import { PartialType, PickType } from '@nestjs/swagger';
import { Account } from 'src/database/entities/account.entity';

export class UpdateMyAccountDto extends PartialType(
  PickType(Account, ['userId', 'username']),
) {}
