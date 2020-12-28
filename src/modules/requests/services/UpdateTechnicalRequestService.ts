import AppError from '@shared/errors/AppError';
import ITechnicalRequestsRepository from '../repositories/ITechnicalRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import TechnicalRequest from '../infra/typeorm/entities/TechnicalRequest';

interface IRequest {
  request_id: string;
  user_id: string;
  description: string;
}

class UpdateTechnicalRequestService {
  constructor(
    private technicalRequestsRepository: ITechnicalRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<TechnicalRequest> {
    const { request_id, description, user_id } = data;

    const saleExists = await this.technicalRequestsRepository.findByRequestId(
      request_id,
    );

    if (!saleExists) {
      throw new AppError('request not found', 404);
    }

    saleExists.description = description;

    await this.technicalRequestsRepository.save(saleExists);

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Atendimento técnico atualizado',
    });

    return saleExists;
  }
}

export default UpdateTechnicalRequestService;
