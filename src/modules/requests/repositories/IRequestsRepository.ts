import ICreateRequestDTO from '../dtos/ICreateRequestDTO';
import Request from '../infra/typeorm/entities/Request';

export default interface IRequestsRepository {
  findById(id: string): Promise<Request | undefined>;
  showById(id: string): Promise<Request | undefined>;
  listAll(): Promise<Request[]>;
  findByDateBetween(from: Date, to: Date): Promise<Request[]>;
  listByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Request[]>;
  search(
    name: string,
    requestStatusId: number,
    page: number,
    perPage: number,
  ): Promise<Request[]>;
  create(request: ICreateRequestDTO): Promise<Request>;
  save(request: Request): Promise<Request>;
}
