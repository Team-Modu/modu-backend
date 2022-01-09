import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { parseString } from 'xml2js';
import { MICRO_SERVICE } from './microservices.constants';
import { ICreateDeviceEventPayload } from './microservices.interfaces';
import { MicroservicesService } from './microservices.service';

@Controller()
export class MicroservicesController {
  constructor(
    @Inject(MICRO_SERVICE) private readonly client: ClientProxy,
    private readonly microservicesService: MicroservicesService,
  ) {}
  // @Get()

  @MessagePattern('device/bus-stop')
  async getArrivalTime(@Payload() data: string) {
    const { data: resultXml } =
      await this.microservicesService.requestLowBusArrival(data);
    parseString(resultXml, (err, result) => {
      this.client.emit(`api/arrival/${data}`, result);
    });
  }

  @MessagePattern('device/route')
  async getBusRoute(@Payload() data: string) {
    const { data: resultXml } =
      await this.microservicesService.requestLowFloorBusRoute(data);
    parseString(resultXml, (err, result) => {
      this.client.emit(`api/route/low-floor/${data}`, result);
    });
  }

  @MessagePattern('device/route/low-floor')
  async getLowFloorBusRoute(@Payload() data: string) {
    const { data: resultXml } =
      await this.microservicesService.requestLowFloorBusRoute(data);
    parseString(resultXml, (err, result) => {
      this.client.emit(`api/route/low-floor/${data}`, result);
    });
  }

  @MessagePattern('device/event')
  async createDeviceEvent(@Payload() data: ICreateDeviceEventPayload) {
    return this.microservicesService.createDeviceEvent(data);
  }
}
