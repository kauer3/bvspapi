import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  showById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  searchByName(
    name: string,
    profile_id: number,
    page: number,
    perPage: number,
  ): Promise<User[]>;
  create(user: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}
