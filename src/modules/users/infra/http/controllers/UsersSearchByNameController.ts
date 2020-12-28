import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import SearchUserByNameService from '@modules/users/services/SearchUserByNameService';

export default class UsersSearchByNameController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, perpage, name = '', profile_id } = request.query;

    const userRepository = new UserRepository();
    const searchUserByNameService = new SearchUserByNameService(userRepository);

    const users = await searchUserByNameService.execute(
      String(name),
      Number(profile_id),
      Number(page),
      Number(perpage),
    );

    return response.json(classToClass(users));
  }
}
