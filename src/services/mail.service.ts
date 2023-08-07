import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

export class MailService {
  transporter: Transporter;

  constructor() {
    const options: SMTPTransport.Options = {
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
    };

    const defaults: SMTPTransport.Options = {
      from: '"MacGuider" <admin@macguider.io>',
    };

    this.transporter = createTransport(options, defaults);
  }

  async sendMail(options: Mail.Options) {
    return this.transporter.sendMail(options);
  }
}
