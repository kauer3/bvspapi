import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IData {
  userIdRemove: string;
  userIdLogged: string;
}

class RemoveUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ userIdRemove, userIdLogged }: IData): Promise<void> {
    const userRemove = await this.usersRepository.findById(userIdRemove);

    if (!userRemove) {
      throw new AppError('User not exists');
    }

    // const userLogged = await this.usersRepository.findById(userIdLogged);

    // if (!userLogged) {
    //   throw new AppError('User not exists');
    // }

    // if (
    //   userRemove.id !== userLogged.id &&
    //   userLogged.profile.name !== 'gestão'
    // ) {
    //   throw new AppError('you are not allowed to remove user');
    // }

    await this.usersRepository.remove(userRemove);
  }
}

export default RemoveUserService;
