import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/role.decorator';
import { DeviceEventsService } from './device-events.service';

@Controller('device-events')
@ApiTags('디바이스 이벤트')
export class DeviceEventsController {
  constructor(private readonly deviceEventsService: DeviceEventsService) {}

  @Get()
  @Roles('Any')
  @UseGuards(RolesGuard)
  async getDeviceEvents() {
    return this.deviceEventsService.getDeviceEvents();
  }
}
