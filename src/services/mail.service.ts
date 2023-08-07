import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { join } from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
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

  private createTemplate = (name: string) => {
    const path = join(__dirname, `../assets/templates/pages/${name}.hbs`);
    const source = fs.readFileSync(path, 'utf8');

    return Handlebars.compile(source);
  };

  async sendMail(
    options: Mail.Options & {
      template: string;
      context: unknown;
    },
  ) {
    const { template: path, context: data, ...rest } = options;
    const template: HandlebarsTemplateDelegate = this.createTemplate(path);
    const html: string = template(data);

    return this.transporter.sendMail({ ...rest, html });
  }
}
