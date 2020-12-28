import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import RemoveUserService from '@modules/users/services/RemoveUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      city,
      city_state,
      company,
      country,
      telephone,
      email,
      password,
      profile_id,
    } = request.body;

    const userRepository = new UserRepository();

    const bCryptHashProvider = new BCryptHashProvider();
    const createUserService = new CreateUserService(
      userRepository,
      bCryptHashProvider,
    );

    const user = await createUserService.execute({
      profile_id,
      name,
      city,
      city_state,
      country,
      company,
      telephone,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const userIdLogged = request.user.id;
    const userIdForShow = request.params.id;

    const userRepository = new UserRepository();

    const showUserService = new ShowUserService(userRepository);

    const users = await showUserService.execute({
      userIdLogged,
      userIdForShow,
    });

    return response.json(classToClass(users));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      city,
      city_state,
      company,
      country,
      email,
      password,
      profile_id,
      telephone,
    } = request.body;

    const userRepository = new UserRepository();
    const bCryptHashProvider = new BCryptHashProvider();
    const updateUserService = new UpdateUserService(
      userRepository,
      bCryptHashProvider,
    );

    const user = await updateUserService.execute({
      id: request.params.id,
      name,
      city,
      city_state,
      company,
      country,
      email,
      password,
      profile_id,
      telephone,
    });

    return response.json(user);
  }

  public async remove(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const userIdLogged = request.user.id;

    const userRepository = new UserRepository();
    const removeUserService = new RemoveUserService(userRepository);

    await removeUserService.execute({ userIdRemove: id, userIdLogged });

    response.status(200).json();
  }
}
