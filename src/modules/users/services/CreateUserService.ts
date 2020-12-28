import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  profile_id: number;
  name: string;
  city: string;
  city_state: string;
  country: string;
  company: string;
  telephone: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const {
      profile_id,
      name,
      city,
      city_state,
      country,
      company,
      email,
      telephone,
      password,
    } = data;

    const checkUserExists = await this.usersRepository.findByEmail(data.email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      profile_id,
      name,
      city,
      city_state,
      country,
      company,
      email,
      telephone,
      password: passwordHashed,
    });

    return user;
  }
}

export default CreateUserService;
