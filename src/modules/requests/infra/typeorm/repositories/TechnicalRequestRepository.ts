import { getRepository, Repository } from 'typeorm';

import ITechnicalRequestsRepository from '@modules/requests/repositories/ITechnicalRequestsRepository';
import ICreateTechnicalRequestDTO from '@modules/requests/dtos/ICreateTechnicalRequestDTO';

import TechnicalRequest from '../entities/TechnicalRequest';

class TechnicalRequestRepository implements ITechnicalRequestsRepository {
  private ormRepository: Repository<TechnicalRequest>;

  constructor() {
    this.ormRepository = getRepository(TechnicalRequest);
  }

  public async create(
    data: ICreateTechnicalRequestDTO,
  ): Promise<TechnicalRequest> {
    const created = this.ormRepository.create({ ...data, description: ' ' });

    await this.ormRepository.save(created);

    return created;
  }

  public async save(data: TechnicalRequest): Promise<TechnicalRequest> {
    await this.ormRepository.save(data);

    return data;
  }

  public async findByRequestId(
    id: string,
  ): Promise<TechnicalRequest | undefined> {
    const request = await this.ormRepository.findOne({
      where: { request_id: id },
      relations: ['request', 'request.user', 'request.contact_type'],
    });
    return request;
  }
}

export default TechnicalRequestRepository;
