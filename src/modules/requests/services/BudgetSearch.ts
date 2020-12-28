import BudgetRequest from '../infra/typeorm/entities/BudgetRequest';
import IBudgetRequestsRepository from '../repositories/IBudgetRequestsRepository';

class BudgetSearch {
  constructor(private budgetRequestsRepository: IBudgetRequestsRepository) {}

  public async execute(
    name = '',
    requestStatusId: number,
    page: number,
    perpage: number,
  ): Promise<BudgetRequest[]> {
    const budgets = await this.budgetRequestsRepository.search(
      name,
      requestStatusId,
      page,
      perpage,
    );

    return budgets;
  }
}

export default BudgetSearch;
