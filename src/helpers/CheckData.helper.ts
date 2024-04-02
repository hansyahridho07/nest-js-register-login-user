import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from 'src/library/dto/General-Response';

export class CheckData {
  static alreadyExist(data: any, message: string): void {
    if (data)
      throw new HttpException(
        new ExceptionResponse(400, message),
        HttpStatus.BAD_REQUEST,
      );
  }

  static notFound(data: any, message: string):  void {
    if (!data)
      throw new HttpException(
        new ExceptionResponse(404, message),
        HttpStatus.NOT_FOUND,
      );
  }
}
