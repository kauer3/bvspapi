import AppError from '@shared/errors/AppError';

import Request from '../infra/typeorm/entities/Request';
import IRequestsRepository from '../repositories/IRequestsRepository';

class ShowRequestService {
  constructor(private requestsRepository: IRequestsRepository) {}

  public async execute(requestId: string): Promise<Request> {
    const request = await this.requestsRepository.showById(requestId);

    if (!request) {
      throw new AppError('request not exists');
    }

    return request;
  }
}

export default ShowRequestService;
