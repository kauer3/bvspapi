import { getRepository, Repository } from 'typeorm';

import IHistoryRequestsRepository from '@modules/requests/repositories/IHistoryRequestsRepository';
import ICreateHistoryRequestDTO from '@modules/requests/dtos/ICreateHistoryRequestDTO';

import HistoryRequest from '../entities/HistoryRequest';

class HistoryRequestsRepository implements IHistoryRequestsRepository {
  private ormRepository: Repository<HistoryRequest>;

  constructor() {
    this.ormRepository = getRepository(HistoryRequest);
  }

  public async create(data: ICreateHistoryRequestDTO): Promise<HistoryRequest> {
    const created = this.ormRepository.create(data);

    await this.ormRepository.save(created);

    return created;
  }

  public async listByRequestId(request_id: string): Promise<HistoryRequest[]> {
    const histories = await this.ormRepository.find({
      where: { request_id },
      relations: ['user'],
    });

    return histories;
  }
}

export default HistoryRequestsRepository;
