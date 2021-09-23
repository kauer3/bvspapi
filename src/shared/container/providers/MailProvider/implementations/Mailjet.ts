import mailjet from 'node-mailjet';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import AppError from '@shared/errors/AppError';
import ImailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class Mailjet implements ImailProvider {
  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
  }

  public async sendMail({
    subject,
    templateData,
    to,
    from,
  }: ISendMailDTO): Promise<void> {
    const client = mailjet.connect(
      '7f3614424114c600a0893a1918fc8e28',
      '9121d790bdf201d3b52a31d4609f1821',
    );
    try {
      await client.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'bvspapp@gmail.com',
              Name: 'BVSP',
            },
            To: [
              {
                Email: to.email,
                Name: to.name,
              },
            ],
            Subject: subject,
            HTMLPart: await this.mailTemplateProvider.parse(templateData),
            CustomID: 'AppGettingStartedTest',
          },
        ],
      });
    } catch {
      throw new AppError('it was not possible send e-mail. Try later', 500);
    }
  }
}
