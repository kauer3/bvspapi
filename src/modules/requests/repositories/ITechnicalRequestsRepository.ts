import ICreateTechnicalRequestDTO from '../dtos/ICreateTechnicalRequestDTO';
import TechnicalRequest from '../infra/typeorm/entities/TechnicalRequest';

export default interface ITechnicalRequestsRepository {
  create(data: ICreateTechnicalRequestDTO): Promise<TechnicalRequest>;
  save(data: TechnicalRequest): Promise<TechnicalRequest>;
  findByRequestId(id: string): Promise<TechnicalRequest | undefined>;
}
