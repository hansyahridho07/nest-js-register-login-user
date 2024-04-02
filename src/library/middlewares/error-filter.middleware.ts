import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.error(error.stack);
    if (status === HttpStatus.UNAUTHORIZED)
      return response.status(status).json({
        success: false,
        msg: 'Unauthorized',
      });
    if (status === HttpStatus.NOT_FOUND)
      return response.status(status).json({
        success: false,
        msg: 'Page Not Found',
      });
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(error.stack);
      if (process.env.NODE_ENV === 'production') {
        return response.status(status).json({
          success: false,
          msg: 'Internal Server Error',
        });
      } else {
        // const message = error.stack;
        return response.status(status).json({
          success: false,
          msg: 'Internal Server Error',
        });
      }
    }

    const message: string | unknown = error.getResponse();
    // let responseStatus = false;
    let responseMessage = message['message'];

    if (Array.isArray(message['message'])) {
      responseMessage = message['message'].join();
    }

    // if (status == 200 || status == 201) {
    //   responseStatus = true;
    // }

    return response.status(status).json({
      success: false,
      msg: message['error'] + ' - ' + responseMessage,
    });
  }
}
