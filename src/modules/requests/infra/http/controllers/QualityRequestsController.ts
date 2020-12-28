import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateQualityRequestService from '@modules/requests/services/UpdateQualityRequestService';
import ShowQualityRequestService from '@modules/requests/services/ShowQualityRequestService';

import QualityRepository from '../../typeorm/repositories/QualityRepository';
import HistoryRequestsRepository from '../../typeorm/repositories/HistoryRequestsRepository';

export default class QualityRequestsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { description, rnc, proceed } = request.body;
    const { request_id } = request.params;
    const user_id = request.user.id;

    const qualityRepository = new QualityRepository();
    const historyRequestsRepository = new HistoryRequestsRepository();

    const updateSaleRequestService = new UpdateQualityRequestService(
      qualityRepository,
      historyRequestsRepository,
    );

    const quality = await updateSaleRequestService.execute({
      description,
      rnc,
      proceed,
      request_id,
      user_id,
    });

    return response.json(classToClass(quality));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.params;

    const qualityRepository = new QualityRepository();

    const showQualityRequestService = new ShowQualityRequestService(
      qualityRepository,
    );

    const quality = await showQualityRequestService.execute(request_id);

    return response.json(classToClass(quality));
  }
}
