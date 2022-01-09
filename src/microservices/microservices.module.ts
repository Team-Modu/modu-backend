import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariables } from 'src/app.interfaces';
import { DeviceEvent } from 'src/database/entities/device-event.entity';
import { MICRO_SERVICE } from './microservices.constants';
import { MicroservicesController } from './microservices.controller';
import { MicroservicesService } from './microservices.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MICRO_SERVICE,
        useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.get<string>('MQTT_URL'),
            port: configService.get<number>('MQTT_PORT', { infer: true }),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    HttpModule,
    TypeOrmModule.forFeature([DeviceEvent]),
  ],
  controllers: [MicroservicesController],
  providers: [MicroservicesService],
})
export class MicroservicesModule {}
