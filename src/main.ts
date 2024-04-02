import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './library/middlewares/http-exception.middleware';
import { ErrorFilter } from './library/middlewares/error-filter.middleware';
import * as moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');
  app.enableCors();
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  moment.tz.setDefault('Asia/Jakarta');
  const logger = new Logger('MainApp');

  // set prefix global
  app.setGlobalPrefix('v1/api');
  await app.listen(port, () => {
    logger.log(`Run in port: ${port}`);
  });
}
bootstrap();
