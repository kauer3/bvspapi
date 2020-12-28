import ICreateFollowUpRequestDTO from '../dtos/ICreateFollowUpRequestDTO';
import FollowUpRequest from '../infra/typeorm/entities/FollowUpRequest';
import { ISearchData } from '../infra/typeorm/repositories/FollowUpRequestsRepository';

export default interface IFollowUpRequestsRepository {
  create(alert: ICreateFollowUpRequestDTO): Promise<FollowUpRequest>;
  save(data: FollowUpRequest): Promise<FollowUpRequest>;
  findByRequestId(id: string): Promise<FollowUpRequest | undefined>;
  findByRequestAndRequestType(
    request_id: string,
    request_type_id: number,
  ): Promise<FollowUpRequest | undefined>;
  showByRequestAndRequestType(
    request_id: string,
    request_type_id: number,
  ): Promise<FollowUpRequest | undefined>;
  listByRequestId(id: string): Promise<FollowUpRequest[]>;
  search(
    request_type_id: number,
    request_status_id: number,
    name: string,
    page: number,
    perPage: number,
  ): Promise<ISearchData[]>;
}
