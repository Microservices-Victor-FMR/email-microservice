import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import VerifyAccountEmail from 'src/template/verify-Identity-Email.template';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  constructor(configService: ConfigService) {
    const RESEND_API_KEY = configService.get<string>('RESEND_API_KEY');
    this.resend = new Resend(RESEND_API_KEY);
  }

  async registerEmail(name:string,email:string, token: string) {
    const verifyAccountEmail = await render(VerifyAccountEmail({name:name,token}));
    const data = await this.resend.emails.send({
      to: 'victormartinezbusiness30@gmail.com',
      from: 'ECOMMERCE <onboarding@resend.dev>',
      replyTo: 'you@example.com',
      subject: 'Welcome',
      html: verifyAccountEmail,
    });
    return data;
  }
}
