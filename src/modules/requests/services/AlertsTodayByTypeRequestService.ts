import { format } from 'date-fns';
import IAlertsRequestsRepository from '../repositories/IAlertsRequestsRepository';
import { IDataListaByRequestAndTypeRequest } from '../infra/typeorm/repositories/AlertsRequestsRepository';

interface IData {
  request_type_id: string;
  date: Date;
  page: number;
  perPage: number;
}

class AlertsTodayByTypeRequestService {
  constructor(private alertsRequestsRepository: IAlertsRequestsRepository) {}

  public async execute(
    data: IData,
  ): Promise<IDataListaByRequestAndTypeRequest[]> {
    const { request_type_id, date, page, perPage } = data;

    const dateFormatted = format(date, 'yyyy-MM-dd 23:59:59');

    const alerts = await this.alertsRequestsRepository.listAlertsTodayByRequestType(
      { request_type_id: Number(request_type_id), date: dateFormatted, page, perPage },
    );

    return alerts;
  }
}

export default AlertsTodayByTypeRequestService;
