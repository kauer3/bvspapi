import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import SearchUserByEmailService from '@modules/users/services/SearchUserByEmailService';

export default class UsersSearchByEmailController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { email } = request.query;

    const userRepository = new UserRepository();
    const searchUserByEmailService = new SearchUserByEmailService(
      userRepository,
    );

    const users = await searchUserByEmailService.execute(String(email));

    return response.json(classToClass(users));
  }
}
