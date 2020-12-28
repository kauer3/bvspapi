import AppError from '@shared/errors/AppError';
import IQualityRequestsRepository from '../repositories/IQualityRequestsRepository';

import QualityRequest from '../infra/typeorm/entities/QualityRequest';

class ShowQualityRequestService {
  constructor(private qualityRequestsRepository: IQualityRequestsRepository) {}

  public async execute(request_id: string): Promise<QualityRequest> {
    const qualityExists = await this.qualityRequestsRepository.findByRequestId(
      request_id,
    );

    if (!qualityExists) {
      throw new AppError('request not found', 404);
    }

    return qualityExists;
  }
}

export default ShowQualityRequestService;
