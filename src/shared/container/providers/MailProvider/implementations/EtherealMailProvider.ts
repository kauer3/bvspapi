import nodemailer, { Transporter } from 'nodemailer';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ImailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class EtherealMailProvider implements ImailProvider {
  client: Transporter = nodemailer.createTransport({});

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe BVSP',
        address: from?.email || 'equipe@bvsp.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    // eslint-disable-next-line
    console.log('Message sent: %s', message.messageId);
    // eslint-disable-next-line
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
