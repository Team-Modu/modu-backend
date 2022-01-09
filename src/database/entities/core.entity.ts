import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CoreEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'Primary Key' })
  @IsUUID()
  @ApiProperty({
    name: 'id',
    uniqueItems: true,
    description: '범용고유식별자 UUID(Universally Unique IDentifier)',
  })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  @IsDate()
  @ApiProperty({
    name: 'createdAt',
    description: '해당 객체가 생성된 날짜 및 시간',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @IsDate()
  @ApiProperty({
    name: 'updatedAt',
    description: '해당 객체가 마지막으로 수정된 날짜 및 시간',
  })
  updatedAt: Date;
}

export abstract class CoreEntitySoftDelete extends CoreEntity {
  @DeleteDateColumn({ name: 'deleted_at' })
  @IsDate()
  @ApiProperty({
    name: 'deletedAt',
    description: '해당 객체가 삭제된 시간 (Soft Delete에 한함)',
  })
  deletedAt: Date;
}
