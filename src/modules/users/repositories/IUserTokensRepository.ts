import UserToken from '../infra/typeorm/entities/UserToken';

interface IGenerate {
  user_id: string;
  mobile_code: number;
}

export default interface IUserTokenRepository {
  generate(data: IGenerate): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  findByMobileCode(mobileCode: number): Promise<UserToken | undefined>;
}
