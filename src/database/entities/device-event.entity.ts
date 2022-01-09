import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { DeviceEventCategory } from '../constants/device-event.constants';
import { CoreEntity } from './core.entity';

@Entity('device_event')
export class DeviceEvent extends CoreEntity {
  @Column('enum', { enum: DeviceEventCategory })
  @IsEnum(DeviceEventCategory)
  @ApiProperty({ name: 'category', enum: DeviceEventCategory })
  category: DeviceEventCategory;

  @Column('varchar', { name: 'user_device_id', length: 20 })
  @IsString()
  @ApiProperty({ name: 'user_device_id' })
  userDeviceId: string;

  @Column('varchar', { name: 'driver_device_id', length: 20 })
  @IsString()
  @ApiProperty({ name: 'drvier_device_id' })
  drvierDeviceId: string;

  @Column('varchar', { name: 'bus_stop_id', length: 20 })
  @IsString()
  @ApiProperty({ name: 'stop_id' })
  busStopId: string;
}
