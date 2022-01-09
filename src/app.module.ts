import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { matchEnvFile } from './app.constants';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DeviceEventsModule } from './device-events/device-events.module';
import { EventsModule } from './events/events.module';
import { MicroservicesModule } from './microservices/microservices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: matchEnvFile(process.env.NODE_ENV),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          keepConnectionAlive: true,
        }),
    }),
    CommonModule.forRoot(),
    AuthModule.forRoot(),
    AccountsModule,
    DeviceEventsModule,
    MicroservicesModule,
    EventsModule,
  ],
})
export class AppModule {}
