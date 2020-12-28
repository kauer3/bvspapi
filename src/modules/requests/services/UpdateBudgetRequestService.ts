import AppError from '@shared/errors/AppError';
import IBudgetRequestsRepository from '../repositories/IBudgetRequestsRepository';
import IHistoryRequestsRepository from '../repositories/IHistoryRequestsRepository';

import BudgetRequest from '../infra/typeorm/entities/BudgetRequest';

interface IRequest {
  request_id: string;
  user_id: string;
  description: string;
  budget_number: string;
}

class UpdateBudgetRequestService {
  constructor(
    private budgetRequestsRepository: IBudgetRequestsRepository,
    private historyRequestsRepository: IHistoryRequestsRepository,
  ) {}

  public async execute(data: IRequest): Promise<BudgetRequest> {
    const { request_id, description, user_id, budget_number } = data;

    const budgetExists = await this.budgetRequestsRepository.findByRequestId(
      request_id,
    );

    if (!budgetExists) {
      throw new AppError('request not found', 404);
    }

    budgetExists.description = description;
    budgetExists.budget_number = budget_number;

    const budgetRequest = await this.budgetRequestsRepository.save(
      budgetExists,
    );

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Orçamento Atualizado',
    });

    return budgetRequest;
  }
}

export default UpdateBudgetRequestService;
