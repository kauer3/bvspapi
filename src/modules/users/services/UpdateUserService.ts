import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  profile_id: number;
  name: string;
  city: string;
  city_state: string;
  country: string;
  company: string;
  email: string;
  password?: string;
  telephone?: string;
}

class UpdateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const userData = await this.usersRepository.findById(data.id);

    if (!userData) {
      throw new AppError('userData not found', 404);
    }

    // If user request password update.
    if (data.password) {
      const hashedPassword = await this.hashProvider.generateHash(
        data.password,
      );
      userData.password = hashedPassword;
    }

    // If user change telephone because when register is opcional.
    if (data.telephone) {
      userData.telephone = data.telephone;
    }

    userData.profile_id = data.profile_id;
    userData.name = data.name;
    userData.city = data.city;
    userData.city_state = data.city_state;
    userData.country = data.country;
    userData.company = data.company;

    const userUpdatted = await this.usersRepository.save(userData);

    return userUpdatted;
  }
}

export default UpdateUserService;
