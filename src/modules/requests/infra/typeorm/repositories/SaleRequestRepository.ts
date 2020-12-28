import { getRepository, Repository } from 'typeorm';

import ISaleRequestsRepository from '@modules/requests/repositories/ISaleRequestsRepository';
import ICreateSaleRequestDTO from '@modules/requests/dtos/ICreateSaleRequestDTO';

import SaleRequest from '../entities/SaleRequest';

class SaleRequestRepository implements ISaleRequestsRepository {
  private ormRepository: Repository<SaleRequest>;

  constructor() {
    this.ormRepository = getRepository(SaleRequest);
  }

  public async create(data: ICreateSaleRequestDTO): Promise<SaleRequest> {
    const created = this.ormRepository.create({
      ...data,
      description: ' ',
    });

    await this.ormRepository.save(created);

    return created;
  }

  public async save(data: SaleRequest): Promise<SaleRequest> {
    const updatted = await this.ormRepository.save(data);

    return updatted;
  }

  public async findByRequestId(id: string): Promise<SaleRequest | undefined> {
    const request = await this.ormRepository.findOne({
      where: { request_id: id },
      relations: ['request', 'request.user', 'request.contact_type'],
    });
    return request;
  }
}

export default SaleRequestRepository;
