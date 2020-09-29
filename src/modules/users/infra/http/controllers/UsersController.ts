import { Request, Response } from 'express';

import UserRepository from '@modules/users/infra/firebase/repositories/UserRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, city, company, country, email, password } = request.body;

    const userRepository = new UserRepository();
    const bCryptHashProvider = new BCryptHashProvider();
    const createUserService = new CreateUserService(
      userRepository,
      bCryptHashProvider,
    );

    const user = await createUserService.execute({
      name,
      city,
      company,
      country,
      email,
      password,
    });

    return response.json(user);
  }
}
