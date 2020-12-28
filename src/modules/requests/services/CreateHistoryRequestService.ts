import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import HistoryRequest from '../infra/typeorm/entities/HistoryRequest';

interface IData {
  request_id: string;
  user_id: string;
  message_type: number;
}

class CreateHistoryRequestService {
  constructor(private alertsRequestsRepository: IHistoryRequestsRepository) {}

  public async execute(data: IData): Promise<HistoryRequest> {
    const { user_id, request_id, message_type } = data;

    let description = '';

    switch (message_type) {
      case 1:
        description = 'Solicitação encaminhada para Orçamento';
        break;
      default:
        description = 'Solicitação atualizada';
        break;
    }

    const history = await this.alertsRequestsRepository.create({
      request_id,
      user_id,
      description,
    });

    return history;
  }
}

export default CreateHistoryRequestService;
