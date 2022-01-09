import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Account } from 'src/database/entities/account.entity';

export class CreateAccountDto extends PickType(Account, [
  'userId',
  'username',
  'role',
] as const) {
  @IsString()
  password: string;
}
