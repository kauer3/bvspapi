import IBudgetRequestsRepository from '../repositories/IBudgetRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import BudgetRequest from '../infra/typeorm/entities/BudgetRequest';

interface IRequest {
  request_id: string;
  user_id: string;
}

class CreateBudgetRequestService {
  constructor(
    private budgetRequestsRepository: IBudgetRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<BudgetRequest> {
    const { user_id, request_id } = data;

    const budgetExists = await this.budgetRequestsRepository.findByRequestId(
      request_id,
    );

    if (budgetExists) {
      return budgetExists;
    }

    const budgetRequest = await this.budgetRequestsRepository.create({
      request_id,
      user_id,
    });

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Solicitação encaminhada para Orçamento',
    });

    return budgetRequest;
  }
}

export default CreateBudgetRequestService;
