import ISaleRequestsRepository from '../repositories/ISaleRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import SaleRequest from '../infra/typeorm/entities/SaleRequest';

interface IRequest {
  request_id: string;
  user_id: string;
}

class CreateSaleRequestService {
  constructor(
    private saleRequestsRepository: ISaleRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<SaleRequest> {
    const { user_id, request_id } = data;

    const saleExists = await this.saleRequestsRepository.findByRequestId(
      request_id,
    );

    if (saleExists) {
      return saleExists;
    }

    const saleRequest = await this.saleRequestsRepository.create({
      request_id,
      user_id,
    });

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Solicitação encaminhada para Vendas',
    });

    return saleRequest;
  }
}

export default CreateSaleRequestService;
