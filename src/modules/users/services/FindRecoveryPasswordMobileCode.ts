import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

class FindRecoveryPasswordMobileCode {
  constructor(private userTokensRepository: IUserTokensRepository) {}

  public async execute(mobileCode: number): Promise<string> {
    const token = await this.userTokensRepository.findByMobileCode(mobileCode);

    if (!token) {
      throw new AppError('invalid code', 404);
    }

    return token.token;
  }
}

export default FindRecoveryPasswordMobileCode;
