import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private userTokensRepository: IUserTokensRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const mobileCode = Math.floor(1000 + Math.random() * 9000);

    const { token } = await this.userTokensRepository.generate({
      user_id: user.id,
      mobile_code: mobileCode,
    });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[BVSP] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
          code: mobileCode,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
