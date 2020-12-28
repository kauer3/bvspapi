import AppError from '@shared/errors/AppError';
import ISaleRequestsRepository from '../repositories/ISaleRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import BudgetRequest from '../infra/typeorm/entities/BudgetRequest';
import SaleRequest from '../infra/typeorm/entities/SaleRequest';

interface IRequest {
  request_id: string;
  user_id: string;
  description: string;
}

class UpdateSaleRequestService {
  constructor(
    private saleRequestsRepository: ISaleRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<SaleRequest> {
    const { request_id, description, user_id } = data;

    const saleExists = await this.saleRequestsRepository.findByRequestId(
      request_id,
    );

    if (!saleExists) {
      throw new AppError('request not found', 404);
    }

    saleExists.description = description;

    await this.saleRequestsRepository.save(saleExists);

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Venda atualizada',
    });

    return saleExists;
  }
}

export default UpdateSaleRequestService;
