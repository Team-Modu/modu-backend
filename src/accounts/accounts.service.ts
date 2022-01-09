import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/constants/account.constants';
import { Account } from 'src/database/entities/account.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateMyAccountDto } from './dtos/update-my-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async getAccount(id: string, options?: FindOneOptions<Account>) {
    return this.accountsRepository.findOne(id, options);
  }

  async getAccountByOptions(options?: FindOneOptions<Account>) {
    return this.accountsRepository.findOne(options);
  }

  async getAllAccounts(options?: FindManyOptions<Account>) {
    return this.accountsRepository.find(options);
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    if (createAccountDto.role === Role.Admin) {
      throw new BadRequestException();
    }
    const existingAccount = await this.accountsRepository.findOne({
      where: createAccountDto.userId,
      select: ['id', 'userId', 'username', 'hashedPassword'],
    });
    if (existingAccount) {
      throw new ConflictException('이미 사용중인 아이디입니다.');
    }
    const account = this.accountsRepository.create(createAccountDto);
    account.hashedPassword = createAccountDto.password;
    await this.accountsRepository.save(account);
    return;
  }

  async updateMyAccount(
    accountId: string,
    updateMyAccountDto: UpdateMyAccountDto,
  ) {
    const account = await this.accountsRepository.findOne(accountId);
  }

  async updateRefreshToken(account: Account, refreshToken: string) {
    return this.accountsRepository.update(account.id, { refreshToken });
  }
}
