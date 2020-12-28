import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IData {
  userIdForShow: string;
  userIdLogged: string;
}

class ShowUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ userIdForShow, userIdLogged }: IData): Promise<User> {
    const userForShow = await this.usersRepository.showById(userIdForShow);

    if (!userForShow) {
      throw new AppError('user not exists');
    }

    const userLogged = await this.usersRepository.showById(userIdLogged);

    if (!userLogged) {
      throw new AppError('you need to be authenticated');
    }

    if (
      userForShow.id !== userLogged.id &&
      userLogged.profile.name !== 'gestão'
    ) {
      throw new AppError('you are not allowed to remove user');
    }

    return userForShow;
  }
}

export default ShowUserService;
