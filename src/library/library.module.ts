import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './environment/configuration';
import { environments } from './environment/environment';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './middlewares/logger.interceptor';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: environments[process.env.NODE_ENV] || '.env',
    }),
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    PrismaService,
  ],
})
export class LibraryModule {}
