import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ListFollowUpsRequestService from '@modules/requests/services/ListFollowUpsRequestService';
import ShowFollowUpByRequestService from '@modules/requests/services/ShowFollowUpByRequestService';
import CreateFollowUpService from '@modules/requests/services/CreateFollowUpService';
import CreateSaleRequestService from '@modules/requests/services/CreateSaleRequestService';
import CreateQualityRequestService from '@modules/requests/services/CreateQualityRequestService';

import CreateBudgetRequestService from '@modules/requests/services/CreateBudgetRequestService';
import CreateTechnicalRequestService from '@modules/requests/services/CreateTechnicalRequestService';
import CreateAlertRequestService from '@modules/requests/services/CreateAlertRequestService';
import FollowUpRequestsRepository from '../../typeorm/repositories/FollowUpRequestsRepository';
import RequestRepository from '../../typeorm/repositories/RequestRepository';
import AlertsRequestsRepository from '../../typeorm/repositories/AlertsRequestsRepository';
import HistoryRequestsRepository from '../../typeorm/repositories/HistoryRequestsRepository';
import BudgetRequestRepository from '../../typeorm/repositories/BudgetRequestRepository';
import SaleRequestRepository from '../../typeorm/repositories/SaleRequestRepository';
import QualityRepository from '../../typeorm/repositories/QualityRepository';
import TechnicalRequestRepository from '../../typeorm/repositories/TechnicalRequestRepository';

export default class RequestsFollowup {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      request_id,
      request_type,
      attendant_description,
      alert,
    } = request.body;
    const user_id = request.user.id;

    const followUpRequestsRepository = new FollowUpRequestsRepository();
    const requestRepository = new RequestRepository();

    const createFollowUpService = new CreateFollowUpService(
      followUpRequestsRepository,
      requestRepository,
    );

    await createFollowUpService.execute({
      user_id,
      request_id,
      request_type,
      attendant_description,
    });

    // Second step is send request to department
    const historyRequestsRepository = new HistoryRequestsRepository();

    if (request_type === 1) {
      const saleRequestRepository = new SaleRequestRepository();
      const createSaleRequestService = new CreateSaleRequestService(
        saleRequestRepository,
        historyRequestsRepository,
      );

      await createSaleRequestService.execute({ user_id, request_id });
    }

    if (request_type === 2) {
      const qualityRepository = new QualityRepository();
      const createQualityRequestService = new CreateQualityRequestService(
        qualityRepository,
        historyRequestsRepository,
      );

      await createQualityRequestService.execute({ user_id, request_id });
    }

    if (request_type === 3) {
      const budgetRequestRepository = new BudgetRequestRepository();
      const createBudgetRequestService = new CreateBudgetRequestService(
        budgetRequestRepository,
        historyRequestsRepository,
      );

      await createBudgetRequestService.execute({ user_id, request_id });
    }

    if (request_type === 4) {
      const technicalRequestRepository = new TechnicalRequestRepository();
      const createTechnicalRequestService = new CreateTechnicalRequestService(
        technicalRequestRepository,
        historyRequestsRepository,
      );

      await createTechnicalRequestService.execute({ user_id, request_id });
    }

    if (alert) {
      // Third step is alert create
      const alertsRequestsRepository = new AlertsRequestsRepository();
      const createAlertRequestService = new CreateAlertRequestService(
        alertsRequestsRepository,
      );

      await createAlertRequestService.execute({
        request_id,
        user_id,
        moment: alert,
      });
    }

    return response.json({ msg: 'success' });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      request_type_id,
      request_status_id,
      name,
      page,
      perpage,
    } = request.query;

    const followUpRequestsRepository = new FollowUpRequestsRepository();
    const listFollowUpsRequestService = new ListFollowUpsRequestService(
      followUpRequestsRepository,
    );

    const followUps = await listFollowUpsRequestService.execute({
      request_type_id: Number(request_type_id),
      request_status_id: Number(request_status_id),
      name: String(name),
      page: Number(page),
      perpage: Number(perpage),
    });

    return response.json(classToClass(followUps));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const followUpRequestsRepository = new FollowUpRequestsRepository();

    const showFollowUpByRequestService = new ShowFollowUpByRequestService(
      followUpRequestsRepository,
    );

    const followUps = await showFollowUpByRequestService.execute(
      request.params.request_id,
      Number(request.params.request_type_id),
    );

    return response.json(classToClass(followUps));
  }
}
