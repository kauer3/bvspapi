import ITechnicalRequestsRepository from '../repositories/ITechnicalRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import TechnicalRequest from '../infra/typeorm/entities/TechnicalRequest';

interface IRequest {
  request_id: string;
  user_id: string;
}

class CreateTechnicalRequestService {
  constructor(
    private technicalRequestsRepository: ITechnicalRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<TechnicalRequest> {
    const { user_id, request_id } = data;

    const techExists = await this.technicalRequestsRepository.findByRequestId(
      request_id,
    );

    if (techExists) {
      return techExists;
    }

    const techRequest = await this.technicalRequestsRepository.create({
      request_id,
      user_id,
    });

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Solicitação encaminhada para atendimento técnico',
    });

    return techRequest;
  }
}

export default CreateTechnicalRequestService;
