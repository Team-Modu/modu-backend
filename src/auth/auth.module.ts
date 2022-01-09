import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountsModule } from 'src/accounts/accounts.module';
import { EnvironmentVariables } from 'src/app.interfaces';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
// import { LocalStrategy } from './strategies/local.strategy';

@Global()
@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        AccountsModule,
        PassportModule,
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
            secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      exports: [AuthService],
    };
  }
}
