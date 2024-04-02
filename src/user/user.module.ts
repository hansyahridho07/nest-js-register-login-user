import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaQueryBuilder } from 'src/helpers/PrismaQueryBuilder.helper';
import { MailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MailModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get('SECRET_JWT'),
        signOptions: { expiresIn: config.get('EXPIRED_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaQueryBuilder],
})
export class UserModule {}
