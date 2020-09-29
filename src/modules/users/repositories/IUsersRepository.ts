import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUserDataDTO from '../dtos/IUserDataDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<IUserDataDTO | undefined>;
  findByEmail(email: string): Promise<IUserDataDTO | undefined>;
  create(data: ICreateUserDTO): Promise<IUserDataDTO>;
}
