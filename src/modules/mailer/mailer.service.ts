import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmployeeService } from 'src/modules/employee/employee.service';

@Injectable()
export class MailerService {
    private hrmsGmailTransporter;
    private adminGmailTransporter;

    constructor( private employeeService : EmployeeService) {
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

    async sendEmail(from: string, to: string, subject: string, htmlBody: string, employeeId: number) {
        let transporter;
        let employeeDetails;

        //Fetch Employee Details
        try{
            employeeDetails = await this.employeeService.findById(employeeId);
        } catch (error) {
            throw new Error('Failed to fetch employee details');
        }

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
            html: htmlBody,
        };

        return transporter.sendMail(mailOptions);
    }
}
