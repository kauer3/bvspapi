import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateTechnicalRequestService from '@modules/requests/services/CreateTechnicalRequestService';
import ShowTechnicalRequestService from '@modules/requests/services/ShowTechnicalRequestService';
import UpdateTechnicalRequestService from '@modules/requests/services/UpdateTechnicalRequestService';

import TechnicalRequestRepository from '../../typeorm/repositories/TechnicalRequestRepository';
import HistoryRequestsRepository from '../../typeorm/repositories/HistoryRequestsRepository';

export default class TechnicalRequestsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.body;
    const user_id = request.user.id;

    const technicalRequestRepository = new TechnicalRequestRepository();
    const historyRequestsRepository = new HistoryRequestsRepository();

    const createTechnicalRequestService = new CreateTechnicalRequestService(
      technicalRequestRepository,
      historyRequestsRepository,
    );

    const tech = await createTechnicalRequestService.execute({
      request_id,
      user_id,
    });

    return response.json(classToClass(tech));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.params;

    const technicalRequestRepository = new TechnicalRequestRepository();
    const showTechnicalRequestService = new ShowTechnicalRequestService(
      technicalRequestRepository,
    );

    const technical = await showTechnicalRequestService.execute(request_id);

    return response.json(classToClass(technical));
  }

  public async save(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.params;
    const user_id = request.user.id;
    const { description } = request.body;

    const technicalRequestRepository = new TechnicalRequestRepository();
    const historyRequestsRepository = new HistoryRequestsRepository();

    const updateTechnicalRequestService = new UpdateTechnicalRequestService(
      technicalRequestRepository,
      historyRequestsRepository,
    );

    const sale = await updateTechnicalRequestService.execute({
      request_id,
      user_id,
      description,
    });

    return response.json(classToClass(sale));
  }
}
