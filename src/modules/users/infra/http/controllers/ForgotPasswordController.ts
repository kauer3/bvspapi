import { Request, Response } from 'express';

import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import Mailjet from '@shared/container/providers/MailProvider/implementations/Mailjet';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const mailTemplateProvider = new HandlebarsMailTemplateProvider();

    const mailjet = new Mailjet(mailTemplateProvider);
    const hashProvider = new BCryptHashProvider();
    const userRepository = new UserRepository();
    const userTokensRepository = new UserTokensRepository();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      userRepository,
      mailjet,
      userTokensRepository,
      hashProvider
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json({});
  }
}
