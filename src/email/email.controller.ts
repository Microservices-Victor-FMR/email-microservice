import { Controller} from '@nestjs/common';
import { EmailService } from './email.service';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('user_created')
  async resendEmail(@Payload() payload: any) {
    const{ name,email,token}= payload
    const result = await this.emailService.registerEmail(name,email,token);
   return result
  }

  @EventPattern('user_resend_email')
  async resendVerifyEmail(@Payload() payload: any) {
    const{ name,email,token}= payload
    const result = await this.emailService.resendEmail(name,email,token);
   return result
  }

  
}


