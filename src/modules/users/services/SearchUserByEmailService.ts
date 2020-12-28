import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

class SearchUserByEmailService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findByEmail(email.toLowerCase());

    return user;
  }
}

export default SearchUserByEmailService;
