import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import RequestRepository from '@modules/requests/infra/typeorm/repositories/RequestRepository';
import HistoryRequestsRepository from '@modules/requests/infra/typeorm/repositories/HistoryRequestsRepository';
import CreateRequestService from '@modules/requests/services/CreateRequestService';
import SearchRequests from '@modules/requests/services/SearchRequests';
import ShowRequestService from '@modules/requests/services/ShowRequestService';
import UpdateStatusRequestService from '@modules/requests/services/UpdateStatusRequestService';
import CreateFollowUpService from '@modules/requests/services/CreateFollowUpService';
import CreateQualityRequestService from '@modules/requests/services/CreateQualityRequestService';
import CreateBudgetRequestService from '@modules/requests/services/CreateBudgetRequestService';
import CreateAlertRequestService from '@modules/requests/services/CreateAlertRequestService';
import FollowUpRequestsRepository from '../../typeorm/repositories/FollowUpRequestsRepository';
import BudgetRequestRepository from '../../typeorm/repositories/BudgetRequestRepository';
import QualityRepository from '../../typeorm/repositories/QualityRepository';
import AlertsRequestsRepository from '../../typeorm/repositories/AlertsRequestsRepository';

export default class RequestController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      contact_type_id,
      description,
      contact,
      request_type,
      alert,
    } = request.body;

    // Primeiro, criação da requisição.
    const requestRepository = new RequestRepository();
    const createRequestService = new CreateRequestService(requestRepository);
    const requestCreated = await createRequestService.execute({
      user_id,
      contact_type_id,
      description,
      contact,
    });

    // Segundo, gera o follow-up.
    const followUpRequestsRepository = new FollowUpRequestsRepository();
    const createFollowUpService = new CreateFollowUpService(
      followUpRequestsRepository,
      requestRepository,
    );

    await createFollowUpService.execute({
      user_id,
      request_id: requestCreated.id,
      request_type,
    });

    // Terceiro, encaminha para o respectivo departamento.
    const historyRequestsRepository = new HistoryRequestsRepository();

    if (request_type === 2) {
      const qualityRepository = new QualityRepository();
      const createQualityRequestService = new CreateQualityRequestService(
        qualityRepository,
        historyRequestsRepository,
      );

      await createQualityRequestService.execute({
        user_id,
        request_id: requestCreated.id,
      });
    }

    if (request_type === 3) {
      const budgetRequestRepository = new BudgetRequestRepository();
      const createBudgetRequestService = new CreateBudgetRequestService(
        budgetRequestRepository,
        historyRequestsRepository,
      );

      await createBudgetRequestService.execute({
        user_id,
        request_id: requestCreated.id,
      });
    }

    // Quarto, define o alerta.
    const alertsRequestsRepository = new AlertsRequestsRepository();
    const createAlertRequestService = new CreateAlertRequestService(
      alertsRequestsRepository,
    );
    await createAlertRequestService.execute({
      user_id,
      request_id: requestCreated.id,
      moment: alert,
    });

    return response.json(classToClass(requestCreated));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, request_status_id, page, perpage } = request.query;

    const requestRepository = new RequestRepository();
    const searchRequests = new SearchRequests(requestRepository);

    const requests = await searchRequests.execute(
      String(name),
      Number(request_status_id),
      Number(page),
      Number(perpage),
    );

    return response.json(classToClass(requests));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const requestRepository = new RequestRepository();
    const showRequestService = new ShowRequestService(requestRepository);

    const requests = await showRequestService.execute(request.params.id);

    return response.json(classToClass(requests));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { attendant_description } = request.body;
    const user_id = request.user.id;

    const requestRepository = new RequestRepository();
    const historyRequestsRepository = new HistoryRequestsRepository();
    const updateStatusRequestService = new UpdateStatusRequestService(
      requestRepository,
      historyRequestsRepository,
    );

    const requestUpdatted = await updateStatusRequestService.execute({
      attendant_description,
      request_id: id,
      user_id,
    });

    return response.json(classToClass(requestUpdatted));
  }
}
