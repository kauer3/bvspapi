import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { Token } from 'nodemailer/lib/xoauth2';
import UserToken from '../entities/UserToken';

interface IGenerate {
  user_id: string;
  mobile_code: number;
}

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate({
    user_id,
    mobile_code,
  }: IGenerate): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
      mobile_code,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async findByMobileCode(
    mobileCode: number,
  ): Promise<UserToken | undefined> {
    const response = await this.ormRepository.findOne({
      where: { mobile_code: mobileCode },
    });

    return response;
  }
}

export default UserTokensRepository;
