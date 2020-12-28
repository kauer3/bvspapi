import { getRepository, Raw, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async showById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      relations: ['profile'],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations: ['profile'],
    });

    return user;
  }

  public async searchByName(
    name = '',
    profile_id: number,
    page: number,
    perPage: number,
  ): Promise<User[]> {
    const users = await this.ormRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      relations: ['profile'],
      where: {
        name: Raw(alias => `${alias} ILIKE '%${name}%'`),
        profile_id,
      },
      order: {
        name: 'ASC',
      },
    });

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async remove(user: User): Promise<void> {
    this.ormRepository.remove(user);
  }
}

export default UsersRepository;
