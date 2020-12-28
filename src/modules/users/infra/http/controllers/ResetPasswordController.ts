import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const userRepository = new UserRepository();
    const userTokensRepository = new UserTokensRepository();
    const hashProvider = new BCryptHashProvider();

    const resetPassword = new ResetPasswordService(
      userRepository,
      userTokensRepository,
      hashProvider,
    );

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
