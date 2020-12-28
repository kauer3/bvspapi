import { Request, Response } from 'express';
// import { classToClass } from 'class-transformer';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import UserExportGogleFirestoreToPostgres from '@modules/users/services/UserExportGogleFirestoreToPostgres';

export default class UsersFirebaseExportToPostgresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const bCryptHashProvider = new BCryptHashProvider();
    const userExportGogleFirestoreToPostgres = new UserExportGogleFirestoreToPostgres(
      userRepository,
      bCryptHashProvider,
    );

    const user = await userExportGogleFirestoreToPostgres.execute();

    return response.json(user);
  }
}
