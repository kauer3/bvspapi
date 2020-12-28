import { getRepository, ILike, Like, Repository } from 'typeorm';

import IFollowUpRequestsRepository from '@modules/requests/repositories/IFollowUpRequestsRepository';
import ICreateFollowUpRequestDTO from '@modules/requests/dtos/ICreateFollowUpRequestDTO';

import FollowUpRequest from '../entities/FollowUpRequest';

export interface ISearchData {
  id: string;
  request_id: string;
  request_type_id: number;
  request_status_id: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
}

class FollowUpRequestsRepository implements IFollowUpRequestsRepository {
  private ormRepository: Repository<FollowUpRequest>;

  constructor() {
    this.ormRepository = getRepository(FollowUpRequest);
  }

  public async create(
    data: ICreateFollowUpRequestDTO,
  ): Promise<FollowUpRequest> {
    const created = this.ormRepository.create(data);

    await this.ormRepository.save(created);

    return created;
  }

  public async save(data: FollowUpRequest): Promise<FollowUpRequest> {
    const upatted = await this.ormRepository.save(data);

    return upatted;
  }

  public async findByRequestId(
    id: string,
  ): Promise<FollowUpRequest | undefined> {
    const followUp = await this.ormRepository.findOne({
      where: { request_id: id },
      relations: [
        'request',
        'request_status',
        'request.user',
        'request.contact_type',
      ],
    });
    return followUp;
  }

  public async listByRequestId(id: string): Promise<FollowUpRequest[]> {
    const followUp = await this.ormRepository.find({
      where: { request_id: id },
    });
    return followUp;
  }

  public async findByRequestAndRequestType(
    request_id: string,
    request_type_id: number,
  ): Promise<FollowUpRequest | undefined> {
    const followUp = await this.ormRepository.findOne({
      where: { request_id, request_type_id },
    });

    return followUp;
  }

  public async showByRequestAndRequestType(
    request_id: string,
    request_type_id: number,
  ): Promise<FollowUpRequest | undefined> {
    const followUp = await this.ormRepository.findOne({
      where: { request_id, request_type_id },
      relations: [
        'request',
        'request_status',
        'request.user',
        'request.contact_type',
      ],
    });

    return followUp;
  }

  public async search(
    request_type_id: number,
    request_status_id: number,
    name: string,
    page: number,
    perPage: number,
  ): Promise<ISearchData[]> {
    const skipPage = (page - 1) * perPage;

    const followups = await this.ormRepository.query(`
    SELECT
      f.id,
      f.request_id,
      f.request_type_id,
      f.request_status_id,
      f.user_id,
      f.created_at,
      f.updated_at,
      r.user_id,
      u."name" as user_name
    FROM public.followup_requests as f
    inner join requests r on (r.id = f.request_id)
    inner join users u on (u.id = r.user_id)
    where u."name" ilike '%${name}%'
    and f.request_status_id = ${request_status_id}
    and f.request_type_id  = ${request_type_id}
    LIMIT ${perPage}
    OFFSET ${skipPage};
    `);

    return followups;
  }
}

export default FollowUpRequestsRepository;
