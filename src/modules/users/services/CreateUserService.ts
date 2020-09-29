import AppError from '@shared/errors/AppError';

import IUserDataDTO from '../dtos/IUserDataDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  city: string;
  country: string;
  company: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<IUserDataDTO> {
    const { name, city, company, country, email, password } = data;

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      name_insensitive: name.toLocaleLowerCase().trim(),
      city,
      company,
      country,
      email,
      accesscode: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
