import AppError from '@shared/errors/AppError';
import ITechnicalRequestsRepository from '../repositories/ITechnicalRequestsRepository';

import TechnicalRequest from '../infra/typeorm/entities/TechnicalRequest';

class ShowTechnicalRequestService {
  constructor(
    private technicalRequestsRepository: ITechnicalRequestsRepository,
  ) {}

  public async execute(request_id: string): Promise<TechnicalRequest> {
    const technicalExists = await this.technicalRequestsRepository.findByRequestId(
      request_id,
    );

    if (!technicalExists) {
      throw new AppError('request not found', 404);
    }

    return technicalExists;
  }
}

export default ShowTechnicalRequestService;
