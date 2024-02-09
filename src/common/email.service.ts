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

  async sendBulkMail({
    recipients,
    subject,
    html,
  }: {
    recipients: string[];
    subject: string;
    html: string;
  }) {
    const promises = recipients.map((to) => {
      const mailOptions = {
        from: 'ravi149185@gmail.com',
        to,
        subject,
        html,
      };
      return new Promise((resolve, reject) => {
        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log('Email sent to ', to);
            resolve(info.response);
          }
        });
      });
    });

    try {
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      throw error;
    }
  }
}
