import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ListAllFollowUpsRequestService from '@modules/requests/services/ListAllFollowUpsRequestService';
import FollowUpRequestsRepository from '../../typeorm/repositories/FollowUpRequestsRepository';

export default class RequestsGetFollowupController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.params;

    const followUpRequestsRepository = new FollowUpRequestsRepository();

    const listAllFollowUpsRequestService = new ListAllFollowUpsRequestService(
      followUpRequestsRepository,
    );

    const followUps = await listAllFollowUpsRequestService.execute(
      String(request_id),
    );

    return response.json(classToClass(followUps));
  }
}
