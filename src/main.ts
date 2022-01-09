import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { AppModule } from './app.module';
import { IRequest } from './common/common.interfaces';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.use(cookieParser(configService.get<string>('COOKIE_PARSER_SECRET')));
  // app.use(helmet());
  app.use(
    csurf({
      cookie: true,
      value: (req: IRequest) => req.csrfToken(),
    }),
  );
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.MQTT,
      options: {
        url: configService.get<string>('MQTT_URL'),
        port: +configService.get<string>('MQTT_PORT'),
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('modubus')
    .setDescription('modubus API description')
    .setVersion('1.0')
    .addTag('modubus')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(+configService.get<string>('PORT'));
  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
