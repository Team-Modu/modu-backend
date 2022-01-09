import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/app.interfaces';
import { CommonService } from './common.service';

@Global()
@Module({})
export class CommonModule {
  static forRoot(): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
            secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [CommonService],
      exports: [CommonService, JwtModule],
    };
  }
}
