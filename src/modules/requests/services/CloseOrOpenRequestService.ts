import AppError from '@shared/errors/AppError';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';
import IFollowUpRequestsRepository from '../repositories/IFollowUpRequestsRepository';
import IRequestsRepository from '../repositories/IRequestsRepository';

import FollowUpRequest from '../infra/typeorm/entities/FollowUpRequest';

interface IRequest {
  request_id: string;
  request_type_id: number;
  user_id: string;
  action: 'open' | 'close';
}

class CloseOrOpenRequestService {
  constructor(
    private historyRequestsRepository: IHistoryRequestsRepository,
    private followUpRequestsRepository: IFollowUpRequestsRepository,
    private requestsRepository: IRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<FollowUpRequest> {
    const { request_id, request_type_id, user_id, action } = data;

    const requestFollowUp = await this.followUpRequestsRepository.findByRequestAndRequestType(
      request_id,
      request_type_id,
    );

    if (!requestFollowUp) {
      throw new AppError('request not found', 404);
    }

    const request = await this.requestsRepository.findById(request_id);

    if (!request) {
      throw new AppError('request not found', 404);
    }

    requestFollowUp.request_status_id = action === 'close' ? 3 : 2;
    await this.followUpRequestsRepository.save(requestFollowUp);

    request.request_status_id = action === 'close' ? 3 : 2;
    await this.requestsRepository.save(request);

    let description = '';

    if (request_type_id === 1) {
      description = action === 'close' ? 'Venda encerrada' : 'Venda reaberta';
    }
    if (request_type_id === 2) {
      description =
        action === 'close'
          ? 'Análise de qualidade encerrada'
          : 'Venda reaberta';
    }
    if (request_type_id === 3) {
      description =
        action === 'close' ? 'Orçamento encerrado' : 'Orçamento reaberto';
    }
    if (request_type_id === 4) {
      description =
        action === 'close'
          ? 'Atendimento técnico encerrado'
          : 'Atendimento técnico reaberto';
    }

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description,
    });

    return requestFollowUp;
  }
}

export default CloseOrOpenRequestService;
