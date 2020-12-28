import { getRepository, Repository } from 'typeorm';

import IQualityRequestsRepository from '@modules/requests/repositories/IQualityRequestsRepository';
import ICreateQualityRequestDTO from '@modules/requests/dtos/ICreateQualityRequestDTO';

import QualityRequest from '../entities/QualityRequest';

class QualityRequestsRepository implements IQualityRequestsRepository {
  private ormRepository: Repository<QualityRequest>;

  constructor() {
    this.ormRepository = getRepository(QualityRequest);
  }

  public async create(data: ICreateQualityRequestDTO): Promise<QualityRequest> {
    const created = this.ormRepository.create({
      ...data,
      description: ' ',
      rnc: ' ',
    });

    await this.ormRepository.save(created);

    return created;
  }

  public async save(data: QualityRequest): Promise<QualityRequest> {
    const updatted = await this.ormRepository.save(data);

    return updatted;
  }

  public async findByRequestId(
    id: string,
  ): Promise<QualityRequest | undefined> {
    const request = await this.ormRepository.findOne({
      where: { request_id: id },
      relations: ['request', 'request.user', 'request.contact_type'],
    });
    return request;
  }
}

export default QualityRequestsRepository;
