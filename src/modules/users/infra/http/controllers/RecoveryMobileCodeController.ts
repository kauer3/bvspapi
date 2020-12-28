import { Request, Response } from 'express';

import FindRecoveryPasswordMobileCode from '@modules/users/services/FindRecoveryPasswordMobileCode';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

export default class RecoveryMobileCodeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { mobile_code } = request.body;

    const userTokensRepository = new UserTokensRepository();
    const findRecoveryPasswordMobileCode = new FindRecoveryPasswordMobileCode(
      userTokensRepository,
    );

    const token = await findRecoveryPasswordMobileCode.execute(mobile_code);

    return response.json({ token });
  }
}
