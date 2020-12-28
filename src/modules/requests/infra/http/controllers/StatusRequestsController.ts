import { Request, Response } from 'express';

import ShowStatusRequestService from '@modules/requests/services/ShowStatusRequestService';
import FollowUpRequestsRepository from '../../typeorm/repositories/FollowUpRequestsRepository';

export default class StatusRequestsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.params;

    console.log(request_id);

    const followUpRequestsRepository = new FollowUpRequestsRepository();
    const showStatusRequestService = new ShowStatusRequestService(
      followUpRequestsRepository,
    );

    const status = await showStatusRequestService.execute(request_id);

    return response.json(status);
  }
}
