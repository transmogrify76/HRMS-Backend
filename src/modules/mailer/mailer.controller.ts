import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { log } from 'console';

@Controller('mailer')
export class MailerController {
    constructor(private readonly mailerService: MailerService) {}

    @Post('send-test-email')
    async sendTestEmail(@Body() emailData: { from: string, to: string, subject: string, htmlBody: string, employeeId: number }) {
        const { from, to, subject, htmlBody, employeeId } = emailData;

        try {
            await this.mailerService.sendEmail(from, to, subject, htmlBody, employeeId);
            console.log('Email sent successfully');
            return 'Test email sent successfully';
        } catch (error) {
            return 'Error sending test email: ' + error.message;
        }
    }
}
