import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CloseOrOpenRequestService from '@modules/requests/services/CloseOrOpenRequestService';

import FollowUpRequestsRepository from '../../typeorm/repositories/FollowUpRequestsRepository';
import HistoryRequestsRepository from '../../typeorm/repositories/HistoryRequestsRepository';
import RequestRepository from '../../typeorm/repositories/RequestRepository';

export default class RequestsCloseOrOpenFollowupController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { request_id, request_type_id, action } = request.body;
    const user_id = request.user.id;

    const historyRequestsRepository = new HistoryRequestsRepository();
    const followUpRequestsRepository = new FollowUpRequestsRepository();
    const requestRepository = new RequestRepository();

    const closeOrOpenRequestService = new CloseOrOpenRequestService(
      historyRequestsRepository,
      followUpRequestsRepository,
      requestRepository,
    );

    const flowupRequest = await closeOrOpenRequestService.execute({
      request_id,
      request_type_id,
      user_id,
      action,
    });

    return response.json(classToClass(flowupRequest));
  }
}
