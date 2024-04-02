import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ExceptionResponse } from 'src/library/dto/General-Response';
import configuration from 'src/library/environment/configuration';
import { Roles } from './roles.decorator';
import { Reflector } from '@nestjs/core';
import { payloadJwt } from '../dto/index.dto';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
    private reflector: Reflector,
  ) {}

  logger = new Logger('UserGuard');
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get(Roles, context.getHandler());
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException(
        new ExceptionResponse(400, '[Header] Authorization is required'),
        HttpStatus.BAD_REQUEST,
      );
    }
    
    try {
      let payload: payloadJwt = await this.jwtService.verifyAsync(token, {
        secret: this.config.secret_jwt,
      });
      request['user'] = payload;
    if (!roles || roles.length === 0) {
      return true;
    }
    //check role user
    if (!roles.includes(payload.role)) {
      this.logger.error(`Role ${payload.role} can't access for role: ${roles}`);
      throw new HttpException(
        new ExceptionResponse(401, "You can't access this routes"),
        HttpStatus.UNAUTHORIZED,
      );
    }
    
    return true;
    } catch {
      throw new HttpException(
        new ExceptionResponse(401, 'Unauthorized'),
        HttpStatus.UNAUTHORIZED,
      );
    }
    
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
