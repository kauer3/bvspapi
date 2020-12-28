import ICreateAlertRequestDTO from '../dtos/ICreateAlertRequestDTO';
import AlertRequest from '../infra/typeorm/entities/AlertRequest';
import {
  IDataListaByRequestAndTypeRequest,
  IPropsListByRequestIdAndTypeRequest,
} from '../infra/typeorm/repositories/AlertsRequestsRepository';

export default interface IAlertsRequestsRepository {
  create(alert: ICreateAlertRequestDTO): Promise<AlertRequest>;
  save(data: AlertRequest): Promise<AlertRequest>;
  findByRequestId(id: string): Promise<AlertRequest | undefined>;
  listAlertsTodayByRequestType(
    data: IPropsListByRequestIdAndTypeRequest,
  ): Promise<IDataListaByRequestAndTypeRequest[]>;
  countTodayByProfile(request_type_id: number, date: string): Promise<number>;
}
