import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateSaleRequestService from '@modules/requests/services/CreateSaleRequestService';
import ShowSaleRequestService from '@modules/requests/services/ShowSaleRequestService';
import UpdateSaleRequestService from '@modules/requests/services/UpdateSaleRequestService';

import SaleRequestRepository from '../../typeorm/repositories/SaleRequestRepository';
import HistoryRequestsRepository from '../../typeorm/repositories/HistoryRequestsRepository';

export default class SaleRequestsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.body;
    const user_id = request.user.id;

    const saleRequestRepository = new SaleRequestRepository();
    const historyRequestsRepository = new HistoryRequestsRepository();

    const createSaleRequestService = new CreateSaleRequestService(
      saleRequestRepository,
      historyRequestsRepository,
    );

    const sale = await createSaleRequestService.execute({
      request_id,
      user_id,
    });

    return response.json(classToClass(sale));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description, budget_number } = request.body;
    const { request_id } = request.params;
    const user_id = request.user.id;

    const saleRequestRepository = new SaleRequestRepository();
    const historyRequestsRepository = new HistoryRequestsRepository();

    const updateSaleRequestService = new UpdateSaleRequestService(
      saleRequestRepository,
      historyRequestsRepository,
    );

    const budgets = await updateSaleRequestService.execute({
      description,
      budget_number,
      request_id,
      user_id,
    });

    return response.json(classToClass(budgets));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { request_id } = request.params;

    const saleRequestRepository = new SaleRequestRepository();
    const showSaleRequestService = new ShowSaleRequestService(
      saleRequestRepository,
    );

    const sale = await showSaleRequestService.execute(request_id);

    return response.json(classToClass(sale));
  }
}
