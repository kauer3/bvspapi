import AppError from '@shared/errors/AppError';
import ISaleRequestsRepository from '../repositories/ISaleRequestsRepository';

import SaleRequest from '../infra/typeorm/entities/SaleRequest';

class ShowSaleRequestService {
  constructor(private saleRequestsRepository: ISaleRequestsRepository) {}

  public async execute(request_id: string): Promise<SaleRequest> {
    const saleExists = await this.saleRequestsRepository.findByRequestId(
      request_id,
    );

    if (!saleExists) {
      throw new AppError('request not found', 404);
    }

    return saleExists;
  }
}

export default ShowSaleRequestService;
