import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AlertsRequestsRepository from '@modules/requests/infra/typeorm/repositories/AlertsRequestsRepository';
import CreateAlertRequestService from '@modules/requests/services/CreateAlertRequestService';
import ShowByRequestAlertRequestService from '@modules/requests/services/ShowByRequestAlertRequestService';

export default class AlertController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { request_id, moment } = request.body;
    const user_id = request.user.id;

    const alertsRequestsRepository = new AlertsRequestsRepository();
    const createAlertRequestService = new CreateAlertRequestService(
      alertsRequestsRepository,
    );

    const requestCreated = await createAlertRequestService.execute({
      user_id,
      request_id,
      moment,
    });

    return response.json(classToClass(requestCreated));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.params;

    const alertsRequestsRepository = new AlertsRequestsRepository();
    const showByRequestAlertRequestService = new ShowByRequestAlertRequestService(
      alertsRequestsRepository,
    );

    const alert = await showByRequestAlertRequestService.execute(request_id);

    return response.json(classToClass(alert));
  }
}
