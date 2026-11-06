import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { SendEmailOptions } from './interfaces';
import { handleError } from '../common/helpers';
@Injectable()
export class SendEmailService {
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    const { to, subject, htmlBody } = options;

    try {
      const { data, error } = await this.resend.emails.send({
        from: `Tech Support <${this.configService.getOrThrow<string>('MAILER_EMAIL')}>`,
        to,
        subject,
        html: htmlBody,
      });

      if (error) {
        console.error('Resend error:', error);
        throw new InternalServerErrorException('Could not send email');
      }

      console.log('Email sent successfully:', data);
    } catch (error) {
      console.error('Send email error:', error);
      handleError(error);
    }
  }
}
