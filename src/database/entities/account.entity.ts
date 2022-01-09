import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { hash, verify } from 'argon2';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Role } from '../constants/account.constants';
import { CoreEntitySoftDelete } from './core.entity';

@Entity('account')
export class Account extends CoreEntitySoftDelete {
  @Column('varchar', { name: 'user_id', unique: true, length: 25 })
  @IsString()
  @ApiProperty({
    name: 'userId',
    description: '사용자 ID',
  })
  userId: string;

  @Column({ name: 'hashed_password', select: false })
  @IsString()
  hashedPassword: string;

  @Column('varchar', { length: 25 })
  @IsString()
  @ApiProperty({
    name: 'username',
    description: '사용자 이름',
  })
  username: string;

  @Column('simple-enum', { enum: Role, default: Role.User })
  @IsEnum(Role)
  @ApiProperty({
    name: 'role',
    description: '사용자 권한',
    enum: Role,
  })
  role: Role;

  @Column('varchar', {
    name: 'refresh_token',
    unique: true,
    select: false,
    nullable: true,
    default: null,
  })
  @IsString()
  @IsOptional()
  refreshToken: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.hashedPassword) {
      try {
        this.hashedPassword = await hash(this.hashedPassword);
      } catch (e) {
        console.error(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    try {
      return verify(this.hashedPassword, inputPassword);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
