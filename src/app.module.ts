import { Module } from '@nestjs/common';
import { LibraryModule } from './library/library.module';
import { UserModule } from './user/user.module';
import { MailModule } from './email/email.module';

@Module({
  imports: [LibraryModule, UserModule, MailModule],
})
export class AppModule {}
