import ITokenCreate from '../dtos/ITokenCreate';
import IUserTokenDTO from '../dtos/IUserTokenDTO';

export default interface IUserTokenRepository {
  save(tokenData: ITokenCreate): Promise<IUserTokenDTO>;
  findByToken(token: string): Promise<IUserTokenDTO | undefined>;
}
