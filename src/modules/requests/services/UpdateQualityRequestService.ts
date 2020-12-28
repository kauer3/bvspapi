import AppError from '@shared/errors/AppError';
import IQualityRequestsRepository from '../repositories/IQualityRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import QualityRequest from '../infra/typeorm/entities/QualityRequest';

interface IRequest {
  request_id: string;
  user_id: string;
  description: string;
  rnc: string;
  proceed: number;
}

class UpdateQualityRequestService {
  constructor(
    private qualityRequestsRepository: IQualityRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<QualityRequest> {
    const { request_id, description, user_id, rnc, proceed } = data;

    const qualityExists = await this.qualityRequestsRepository.findByRequestId(
      request_id,
    );

    if (!qualityExists) {
      throw new AppError('request not found', 404);
    }

    qualityExists.description = description;
    qualityExists.rnc = rnc;
    qualityExists.proceed = proceed;

    await this.qualityRequestsRepository.save(qualityExists);

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Atendimento de qualidade Atualizado',
    });

    return qualityExists;
  }
}

export default UpdateQualityRequestService;
