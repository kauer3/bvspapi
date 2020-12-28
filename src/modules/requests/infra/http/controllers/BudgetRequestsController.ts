import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ShowBudgetByIdService from '@modules/requests/services/ShowBudgetByIdService';
import UpdateBudgetRequestService from '@modules/requests/services/UpdateBudgetRequestService';

import BudgetRequestRepository from '../../typeorm/repositories/BudgetRequestRepository';
import HistoryRequestsRepository from '../../typeorm/repositories/HistoryRequestsRepository';

export default class BudgetRequestsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const budgetRequestRepository = new BudgetRequestRepository();

    const showBudgetByIdService = new ShowBudgetByIdService(
      budgetRequestRepository,
    );

    const budget = await showBudgetByIdService.execute(
      request.params.request_id,
    );

    return response.json(classToClass(budget));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description, budget_number } = request.body;
    const { request_id } = request.params;
    const user_id = request.user.id;

    const budgetRequestRepository = new BudgetRequestRepository();
    const historyRequestsRepository = new HistoryRequestsRepository();

    const updateBudgetRequestService = new UpdateBudgetRequestService(
      budgetRequestRepository,
      historyRequestsRepository,
    );

    const budgets = await updateBudgetRequestService.execute({
      description,
      budget_number,
      request_id,
      user_id,
    });

    return response.json(classToClass(budgets));
  }
}
