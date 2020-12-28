import ICreateHistoryRequestDTO from '../dtos/ICreateHistoryRequestDTO';
import HistoryRequest from '../infra/typeorm/entities/HistoryRequest';

export default interface IHistoryRequestsRepository {
  create(history: ICreateHistoryRequestDTO): Promise<HistoryRequest>;
  listByRequestId(request_id: string): Promise<HistoryRequest[]>;
}
