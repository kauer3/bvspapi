import ICreateBudgetRequestDTO from '../dtos/ICreateBudgetRequestDTO';
import BudgetRequest from '../infra/typeorm/entities/BudgetRequest';

export default interface IBudgetRequestsRepository {
  create(request: ICreateBudgetRequestDTO): Promise<BudgetRequest>;
  save(budget: BudgetRequest): Promise<BudgetRequest>;
  findByRequestId(id: string): Promise<BudgetRequest | undefined>;
  findById(id: string): Promise<BudgetRequest | undefined>;
  search(
    request_status_id: number,
    name: string,
    page: number,
    perPage: number,
  ): Promise<BudgetRequest[]>;
}
