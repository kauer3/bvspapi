import { getRepository, Repository } from 'typeorm';

import IBudgetRequestsRepository from '@modules/requests/repositories/IBudgetRequestsRepository';
import ICreateBudgetRequestDTO from '@modules/requests/dtos/ICreateBudgetRequestDTO';

import BudgetRequest from '../entities/BudgetRequest';

class BudgetRequestRepository implements IBudgetRequestsRepository {
  private ormRepository: Repository<BudgetRequest>;

  constructor() {
    this.ormRepository = getRepository(BudgetRequest);
  }

  public async create(data: ICreateBudgetRequestDTO): Promise<BudgetRequest> {
    const created = this.ormRepository.create(data);

    await this.ormRepository.save(created);

    return created;
  }

  public async save(data: BudgetRequest): Promise<BudgetRequest> {
    const updatted = this.ormRepository.save(data);

    return updatted;
  }

  public async findById(id: string): Promise<BudgetRequest | undefined> {
    const budget = await this.ormRepository.findOne(id);
    return budget;
  }

  public async findByRequestId(id: string): Promise<BudgetRequest | undefined> {
    const request = await this.ormRepository.findOne({
      where: { request_id: id },
      relations: ['request', 'request.user', 'request.contact_type'],
    });
    return request;
  }

  public async search(
    request_status_id: number,
    name: string,
    page: number,
    perPage: number,
  ): Promise<BudgetRequest[]> {
    const budget = await this.ormRepository.find({
      join: { alias: 'requests', innerJoin: { user: 'requests.user' } },
      where: query => {
        query
          .where({
            request_status_id,
          })
          .andWhere('user.name ILIKE :userName', { userName: `%${name}%` });
      },
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        created_at: 'ASC',
      },
      relations: ['user', 'request_status', 'contact_type'],
    });

    return budget;
  }
}

export default BudgetRequestRepository;
