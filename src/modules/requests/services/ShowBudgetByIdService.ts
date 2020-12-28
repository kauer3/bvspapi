import BudgetRequest from '../infra/typeorm/entities/BudgetRequest';
import IBudgetRequestsRepository from '../repositories/IBudgetRequestsRepository';

class ShowBudgetByIdService {
  constructor(private budgetRequestsRepository: IBudgetRequestsRepository) {}

  public async execute(id: string): Promise<BudgetRequest | undefined> {
    const budget = await this.budgetRequestsRepository.findByRequestId(id);

    return budget;
  }
}

export default ShowBudgetByIdService;
