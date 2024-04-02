import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from './entity/user.entity';
import configuration from 'src/library/environment/configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {}
  logger = new Logger('EmailService');
  async sendUserConfirmation(user: User, token: string) {
    const replacements = {
      name: user.name,
      url_confirmation:
        this.config.base_url + '/v1/api/user/email-confirmation/' + token,
    };
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Please Verify Your Account!',
      template: './confirmation.hbs', // `.hbs` extension is appended automatically
      context: { ...replacements }, // ✏️ filling curly brackets with content
    });
    this.logger.log('Email already send to: ' + user.email);
  }
}
