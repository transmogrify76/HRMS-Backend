import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
    constructor(private readonly mailerService: MailerService) {}

    @Post('send-test-email')
    async sendTestEmail(@Body() emailData: { from: string, to: string, subject: string, text: string }) {
        const { from, to, subject, text } = emailData;

        try {
            await this.mailerService.sendEmail(from, to, subject, text);
            return 'Test email sent successfully';
        } catch (error) {
            return 'Error sending test email: ' + error.message;
        }
    }
}
