import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private hrmsGmailTransporter;
    private adminGmailTransporter;

    constructor() {
        // Configuring transporter for HRMS Gmail
        this.hrmsGmailTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'transmogrifyhrms@gmail.com',
                pass: 'vuhp dbvb gzed dekw', // Replace with your HRMS Gmail password
            },
        });

        // Configuring transporter for Admin Gmail
        this.adminGmailTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'transev76@gmail.com',
                pass: 'xhwl anvh macy yxdv', // Replace with your Admin Gmail password
            },
        });
    }

    async sendEmail(from: string, to: string, subject: string, text: string) {
        let transporter;

        // Determine which transporter to use based on the sender's email address
        if (from === 'transmogrifyhrms@gmail.com') {
            transporter = this.hrmsGmailTransporter;
        } else if (from === 'transev76@gmail.com') {
            transporter = this.adminGmailTransporter;
        } else {
            throw new Error('Unsupported sender email address');
        }

        const mailOptions = {
            from,
            to,
            subject,
            text,
        };

        return transporter.sendMail(mailOptions);
    }
}
