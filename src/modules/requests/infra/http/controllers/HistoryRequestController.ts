import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ListHistoriesByRequestService from '@modules/requests/services/ListHistoriesByRequestService';
import HistoryRequestsRepository from '../../typeorm/repositories/HistoryRequestsRepository';

export default class HistoryRequestController {
  public async index(request: Request, response: Response): Promise<Response> {
    const historyRequestsRepository = new HistoryRequestsRepository();

    const listHistoriesByRequestService = new ListHistoriesByRequestService(
      historyRequestsRepository,
    );

    const histories = await listHistoriesByRequestService.execute(
      request.params.request_id,
    );

    return response.json(classToClass(histories));
  }
}
