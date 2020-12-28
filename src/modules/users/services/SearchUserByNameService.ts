import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

class SearchUserByNameService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(
    name: string,
    profile_id: number,
    page: number,
    perpage: number,
  ): Promise<User[]> {
    const users = await this.usersRepository.searchByName(
      name,
      profile_id,
      page,
      perpage,
    );

    return users;
  }
}

export default SearchUserByNameService;
