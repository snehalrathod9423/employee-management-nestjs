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
    from: `"Employee Management" <${this.configService.get<string>('MAIL_USER')}>`,
    to: email,
    subject: '🎉 Welcome to Our Company!',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          
          <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Welcome Aboard 🚀</h1>
          </div>

          <div style="padding: 30px;">
            <h2 style="color: #333;">Hi ${name},</h2>
            <p style="font-size: 16px; color: #555;">
              We are excited to welcome you to the company!
            </p>

            <p style="font-size: 16px; color: #555;">
              Your employee account has been successfully created.
            </p>

            <div style="margin: 25px 0; text-align: center;">
              <a href="#" 
                 style="background-color: #3498db; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                 Login to Your Account
              </a>
            </div>

            <p style="font-size: 14px; color: #999;">
              If you have any questions, feel free to contact HR.
            </p>

            <p style="font-size: 14px; color: #999;">
              Regards,<br/>
              <strong>Employee Management Team</strong>
            </p>
          </div>

          <div style="background-color: #ecf0f1; text-align: center; padding: 15px; font-size: 12px; color: #777;">
            © ${new Date().getFullYear()} Employee Management System
          </div>
        </div>
      </div>
    `,
  });
 }
}
