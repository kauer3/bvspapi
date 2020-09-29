import { Request, Response } from 'express';

import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import UserRepository from '@modules/users/infra/firebase/repositories/UserRepository';
import UserTokensRepository from '@modules/users/infra/firebase/repositories/UserTokensRepository';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const mailTemplateProvider = new HandlebarsMailTemplateProvider();

    const mailProvider = new EtherealMailProvider(mailTemplateProvider);
    const hashProvider = new BCryptHashProvider();
    const userRepository = new UserRepository();
    const userTokensRepository = new UserTokensRepository();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      userRepository,
      mailProvider,
      userTokensRepository,
      hashProvider,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
