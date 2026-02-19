import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string) {
    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_USER'),
      to: email,
      subject: 'Welcome to the Company 🎉',
      html: `
        <h2>Welcome ${name}!</h2>
        <p>Your employee account has been created successfully.</p>
        <p>We are happy to have you onboard 🚀</p>
      `,
    });
  }
}
