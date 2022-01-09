import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEvent } from 'src/database/entities/device-event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceEventsService {
  constructor(
    @InjectRepository(DeviceEvent)
    private readonly deviceEventsRepository: Repository<DeviceEvent>,
  ) {}

  getDeviceEvents() {
    return this.deviceEventsRepository.find();
  }
}
