import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import VerifyAccountEmail from 'src/template/verify-Identity-Email.template';
import updateEmail from 'src/template/updateEmail-Email.template';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  constructor(private readonly configService: ConfigService) {
    const RESEND_API_KEY = configService.get<string>('RESEND_API_KEY');
    this.resend = new Resend(RESEND_API_KEY);
  }

  async registerEmail(name:string,email:string, token: string) {
    const TO_EMAIL=  this.configService.get<string>('TO_EMAIL')
    const verifyAccountEmail = await render(VerifyAccountEmail({name:name,token}));
    const data = await this.resend.emails.send({
      to: TO_EMAIL,
      from: 'ECOMMERCE <onboarding@resend.dev>',
      replyTo: 'you@example.com',
      subject: 'Welcome',
      html: verifyAccountEmail,
    });
    return data;
  }



  async resendEmail(name:string,email:string, token: string) {
    const TO_EMAIL=  this.configService.get<string>('TO_EMAIL')
    const resendVerifyAccountEmail = await render(VerifyAccountEmail({name:name,token}));
    const data = await this.resend.emails.send({
      to: TO_EMAIL,
      from: 'ECOMMERCE <onboarding@resend.dev>',
      replyTo: 'you@example.com',
      subject: 'Resend',
      html: resendVerifyAccountEmail,
    });
    return data;
  }

  async updateEmail(name:string,email:string, token: string) {
    const TO_EMAIL=  this.configService.get<string>('TO_EMAIL')
    const resendVerifyAccountEmail = await render(updateEmail({name:name,token}));
    const data = await this.resend.emails.send({
      to: TO_EMAIL,
      from: 'ECOMMERCE <onboarding@resend.dev>',
      replyTo: 'you@example.com',
      subject: 'Update Email',
      html: resendVerifyAccountEmail,
    });
    return data;
  }
}
