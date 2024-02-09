import { Injectable } from '@nestjs/common';
import { applicationConfig } from 'config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: applicationConfig.email.senderEmail,
        pass: applicationConfig.email.senderPassword,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: 'ravi149185@gmail.com',
      to,
      subject,
      html,
    };

    return this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return error;
      }
      console.log('Email sent: ' + info.response);
      return info.response;
    });
  }
}
