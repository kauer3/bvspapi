import {
  Between,
  getRepository,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import IRequestsRepository from '@modules/requests/repositories/IRequestsRepository';
import ICreateRequestDTO from '@modules/requests/dtos/ICreateRequestDTO';

import Request from '../entities/Request';

class RequestRepository implements IRequestsRepository {
  private ormRepository: Repository<Request>;

  constructor() {
    this.ormRepository = getRepository(Request);
  }

  public async findById(id: string): Promise<Request | undefined> {
    const request = await this.ormRepository.findOne(id);
    return request;
  }

  public async showById(id: string): Promise<Request | undefined> {
    const request = await this.ormRepository.findOne(id, {
      relations: ['user', 'request_status', 'contact_type'],
    });

    return request;
  }

  public async listAll(): Promise<Request[]> {
    const request = await this.ormRepository.find({
      relations: ['user', 'request_status', 'contact_type'],
    });

    return request;
  }

  public async listByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Request[]> {
    const request = await this.ormRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      where: {
        user_id: userId,
      },
      order: {
        created_at: 'DESC',
      },
      relations: ['user', 'request_status', 'contact_type'],
    });

    return request;
  }

  public async findByDateBetween(from: Date, to: Date): Promise<Request[]> {
    const requests = await this.ormRepository.find({
      where: {
        created_at: Between(from, to),
      },
      order: {
        created_at: 'DESC',
      },
    });

    return requests;
  }

  public async search(
    name: string,
    requestStatusId: number,
    page: number,
    perPage: number,
  ): Promise<Request[]> {
    const request = await this.ormRepository.find({
      join: { alias: 'requests', innerJoin: { user: 'requests.user' } },
      where: query => {
        query
          .where({
            request_status_id: requestStatusId,
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

    return request;
  }

  public async create(data: ICreateRequestDTO): Promise<Request> {
    const request = this.ormRepository.create(data);

    await this.ormRepository.save(request);

    return request;
  }

  public async save(request: Request): Promise<Request> {
    return this.ormRepository.save(request);
  }
}

export default RequestRepository;
