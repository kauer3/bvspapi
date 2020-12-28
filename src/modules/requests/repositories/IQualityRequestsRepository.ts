import ICreateQualityRequestDTO from '../dtos/ICreateQualityRequestDTO';
import QualityRequest from '../infra/typeorm/entities/QualityRequest';

export default interface IQualityRequestsRepository {
  create(data: ICreateQualityRequestDTO): Promise<QualityRequest>;
  save(data: QualityRequest): Promise<QualityRequest>;
  findByRequestId(id: string): Promise<QualityRequest | undefined>;
}
