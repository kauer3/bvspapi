import AppError from '@shared/errors/AppError';

import Request from '../infra/typeorm/entities/Request';
import IRequestsRepository from '../repositories/IRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

interface IData {
  request_id: string;
  user_id: string;
  attendant_description: string;
}

class UpdateStatusRequestService {
  constructor(
    private requestsRepository: IRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IData): Promise<Request> {
    const { request_id, attendant_description, user_id } = data;

    const request = await this.requestsRepository.findById(request_id);

    if (!request) {
      throw new AppError('request not found', 404);
    }

    request.attendant_description = attendant_description;
    const requestUpdatted = await this.requestsRepository.save(request);

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Detalhes da solicitação foram atualizado',
    });

    return requestUpdatted;
  }
}

export default UpdateStatusRequestService;
