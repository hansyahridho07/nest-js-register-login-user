import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HttpException');
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message: string | object = exception.getResponse();
    const path = ctx.getRequest().route?.path;
    const method = ctx.getRequest().method;
    // const responseStatus = false;
    // const responseMessage = message['message'];

    // if (Array.isArray(message['message'])) {
    //   responseMessage = message['message'].join();
    // }

    // if (status == 200 || status == 201) {
    //   responseStatus = true;
    // }

    this.logger.error(`Error ${status} ${method}: ${path}`);
    response.status(status).json(message);
  }
}
