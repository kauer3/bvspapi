import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import RequestRepository from '@modules/requests/infra/typeorm/repositories/RequestRepository';
import ListRequestsByUserService from '@modules/requests/services/ListRequestsByUserService';

export default class RequestController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { page, perpage } = request.query;

    const requestRepository = new RequestRepository();
    const listRequestsByUserService = new ListRequestsByUserService(
      requestRepository,
    );

    const requests = await listRequestsByUserService.execute(
      userId,
      Number(page),
      Number(perpage),
    );

    return response.json(classToClass(requests));
  }
}
