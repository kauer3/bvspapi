import IQualityRequestsRepository from '../repositories/IQualityRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import QualityRequest from '../infra/typeorm/entities/QualityRequest';

interface IRequest {
  request_id: string;
  user_id: string;
}

class CreateQualityRequestService {
  constructor(
    private qualityRequestsRepository: IQualityRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<QualityRequest> {
    const { user_id, request_id } = data;

    const qualityExists = await this.qualityRequestsRepository.findByRequestId(
      request_id,
    );

    if (qualityExists) {
      return qualityExists;
    }

    const qualityRequest = await this.qualityRequestsRepository.create({
      request_id,
      user_id,
    });

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Solicitação encaminhada para Qualidade',
    });

    return qualityRequest;
  }
}

export default CreateQualityRequestService;
