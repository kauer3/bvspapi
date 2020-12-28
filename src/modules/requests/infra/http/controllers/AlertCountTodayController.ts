import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AlertsRequestsRepository from '@modules/requests/infra/typeorm/repositories/AlertsRequestsRepository';
import AlertsCountTodayByProfileService from '@modules/requests/services/AlertsCountTodayByProfileService';

export default class AlertCountTodayController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { profile_id } = request.params;

    const alertsRequestsRepository = new AlertsRequestsRepository();
    const alertsCountTodayByProfileService = new AlertsCountTodayByProfileService(
      alertsRequestsRepository,
    );

    const alert = await alertsCountTodayByProfileService.execute(
      Number(profile_id),
    );

    return response.json(classToClass(alert));
  }
}
