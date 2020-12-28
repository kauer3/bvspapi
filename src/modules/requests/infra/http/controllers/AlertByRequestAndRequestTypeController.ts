import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AlertsRequestsRepository from '@modules/requests/infra/typeorm/repositories/AlertsRequestsRepository';
import AlertsTodayByTypeRequestService from '@modules/requests/services/AlertsTodayByTypeRequestService';

export default class AlertByRequestAndRequestTypeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { request_type_id, date, page, perpage } = request.params;

    const alertsRequestsRepository = new AlertsRequestsRepository();
    const alertsTodayByTypeRequestService = new AlertsTodayByTypeRequestService(
      alertsRequestsRepository,
    );


    const alerts = await alertsTodayByTypeRequestService.execute({
      request_type_id,
      date: new Date(date),
      page: Number(page),
      perPage: Number(perpage)
    });

    return response.json(classToClass(alerts));
  }
}
