export class ExceptionResponse {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public data: any;

  constructor(statusCode: number = 500, message: string, data: object = null) {
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class SuccessResponse {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public data: any;

  constructor(
    success: boolean = true,
    statusCode: number = 200,
    message: string,
    data: object = null,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
