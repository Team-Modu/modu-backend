import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosResponse } from 'axios';
import { EnvironmentVariables } from 'src/app.interfaces';
import { DeviceEvent } from 'src/database/entities/device-event.entity';
import { Repository } from 'typeorm';
import { ICreateDeviceEventPayload } from './microservices.interfaces';

@Injectable()
export class MicroservicesService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly httpService: HttpService,
    @InjectRepository(DeviceEvent)
    private readonly deviceEventsRepository: Repository<DeviceEvent>,
  ) {}

  requestLowBusArrival(stopId: string): Promise<AxiosResponse<string>> {
    return axios.get(
      `${this.configService.get<string>(
        'LOWBUS_ARRIVAL_API_URI',
      )}?serviceKey=${this.configService.get<string>(
        'LOWBUS_ARRIVAL_ENCODING_KEY',
      )}&stId=${stopId}`,
    );
  }

  requestBusRoute(busRouteId: string): Promise<AxiosResponse<string>> {
    return axios.get(
      `${this.configService.get<string>(
        'BUS_ROUTE_API_URI',
      )}?serviceKey=${this.configService.get<string>(
        'BUS_ROUTE_ENCODING_KEY',
      )}&busRouteId=${busRouteId}`,
    );
  }

  requestLowFloorBusRoute(busRouteId: string): Promise<AxiosResponse<string>> {
    return axios.get(
      `${this.configService.get<string>(
        'LOWBUS_ROUTE_API_URI',
      )}?serviceKey=${this.configService.get<string>(
        'BUS_ROUTE_ENCODING_KEY',
      )}&busRouteId=${busRouteId}`,
    );
  }

  async createDeviceEvent(data: ICreateDeviceEventPayload) {
    console.log(data);
    return this.deviceEventsRepository.save(
      this.deviceEventsRepository.create(data),
    );
  }
}
