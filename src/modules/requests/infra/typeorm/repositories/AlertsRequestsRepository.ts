import { getRepository, Repository } from 'typeorm';

import IAlertsRequestsRepository from '@modules/requests/repositories/IAlertsRequestsRepository';
import ICreateAlertRequestDTO from '@modules/requests/dtos/ICreateAlertRequestDTO';

import AlertRequest from '../entities/AlertRequest';

export interface IPropsListByRequestIdAndTypeRequest {
  request_type_id: number;
  date: string;
  page: number;
  perPage: number;
}

export interface IDataListaByRequestAndTypeRequest {
  id: string;
  request_id: string;
  request_type_id: string;
  request_status_id: string;
  user_name: string;
  client_id: string;
  client_name: string;
  moment: string;
  created_at: Date;
  updated_at: Date;
}

class AlertsRequestsRepository implements IAlertsRequestsRepository {
  private ormRepository: Repository<AlertRequest>;

  constructor() {
    this.ormRepository = getRepository(AlertRequest);
  }

  public async create(data: ICreateAlertRequestDTO): Promise<AlertRequest> {
    const created = this.ormRepository.create(data);

    await this.ormRepository.save(created);

    return created;
  }

  public async findByRequestId(id: string): Promise<AlertRequest | undefined> {
    const alert = await this.ormRepository.findOne({
      where: { request_id: id },
    });
    return alert;
  }

  public async countTodayByProfile(
    request_type_id: number,
    date: string,
  ): Promise<number> {
    const filterByRequest =
      request_type_id === 5
        ? ''
        : `and f.request_type_id = ${request_type_id} `;

    const alertCount: number = await this.ormRepository.query(`
    SELECT
      count(f.id)
    FROM followup_requests as f
    inner join requests r on (r.id = f.request_id)
    inner join users u on (u.id = r.user_id)
    inner join alert_requests ar on (ar.request_id = f.request_id)
    where f.request_status_id <> 3
    ${filterByRequest}
    and ar.moment < '${date}';
    `);
    return alertCount;
  }

  public async listAlertsTodayByRequestType(
    data: IPropsListByRequestIdAndTypeRequest,
  ): Promise<IDataListaByRequestAndTypeRequest[]> {
    const { request_type_id, date, page, perPage } = data;
    const skipPage = (page - 1) * perPage;


    const filterByRequest =
      request_type_id === 5
        ? ''
        : `and f.request_type_id = ${request_type_id} `;

    const alerts = await this.ormRepository.query(`
    SELECT
      f.id,
      f.request_id,
      f.request_type_id,
      f.request_status_id,
      f.user_id as user_name,
      r.user_id as client_id,
      u."name" as client_name,
      ar.moment,
      f.created_at,
      f.updated_at
    FROM followup_requests as f
    inner join requests r on (r.id = f.request_id)
    inner join users u on (u.id = r.user_id)
    inner join alert_requests ar on (ar.request_id = f.request_id)
    where f.request_status_id <> 3
    ${filterByRequest}
    and ar.moment < '${date}'
    LIMIT ${perPage}
    OFFSET ${skipPage};
    `);

    return alerts;
  }

  public async save(data: AlertRequest): Promise<AlertRequest> {
    const alert = await this.ormRepository.save(data);
    return alert;
  }
}

export default AlertsRequestsRepository;
