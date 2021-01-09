"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _RequestRepository = _interopRequireDefault(require("../../typeorm/repositories/RequestRepository"));

var _HistoryRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/HistoryRequestsRepository"));

var _CreateRequestService = _interopRequireDefault(require("../../../services/CreateRequestService"));

var _SearchRequests = _interopRequireDefault(require("../../../services/SearchRequests"));

var _ShowRequestService = _interopRequireDefault(require("../../../services/ShowRequestService"));

var _UpdateStatusRequestService = _interopRequireDefault(require("../../../services/UpdateStatusRequestService"));

var _CreateFollowUpService = _interopRequireDefault(require("../../../services/CreateFollowUpService"));

var _CreateQualityRequestService = _interopRequireDefault(require("../../../services/CreateQualityRequestService"));

var _CreateBudgetRequestService = _interopRequireDefault(require("../../../services/CreateBudgetRequestService"));

var _CreateAlertRequestService = _interopRequireDefault(require("../../../services/CreateAlertRequestService"));

var _FollowUpRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/FollowUpRequestsRepository"));

var _BudgetRequestRepository = _interopRequireDefault(require("../../typeorm/repositories/BudgetRequestRepository"));

var _QualityRepository = _interopRequireDefault(require("../../typeorm/repositories/QualityRepository"));

var _AlertsRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/AlertsRequestsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestController {
  async create(request, response) {
    const {
      user_id,
      contact_type_id,
      description,
      contact,
      request_type,
      alert
    } = request.body; // Primeiro, criação da requisição.

    const requestRepository = new _RequestRepository.default();
    const createRequestService = new _CreateRequestService.default(requestRepository);
    const requestCreated = await createRequestService.execute({
      user_id,
      contact_type_id,
      description,
      contact
    }); // Segundo, gera o follow-up.

    const followUpRequestsRepository = new _FollowUpRequestsRepository.default();
    const createFollowUpService = new _CreateFollowUpService.default(followUpRequestsRepository, requestRepository);
    await createFollowUpService.execute({
      user_id,
      request_id: requestCreated.id,
      request_type
    }); // Terceiro, encaminha para o respectivo departamento.

    const historyRequestsRepository = new _HistoryRequestsRepository.default();

    if (request_type === 2) {
      const qualityRepository = new _QualityRepository.default();
      const createQualityRequestService = new _CreateQualityRequestService.default(qualityRepository, historyRequestsRepository);
      await createQualityRequestService.execute({
        user_id,
        request_id: requestCreated.id
      });
    }

    if (request_type === 3) {
      const budgetRequestRepository = new _BudgetRequestRepository.default();
      const createBudgetRequestService = new _CreateBudgetRequestService.default(budgetRequestRepository, historyRequestsRepository);
      await createBudgetRequestService.execute({
        user_id,
        request_id: requestCreated.id
      });
    } // Quarto, define o alerta.


    const alertsRequestsRepository = new _AlertsRequestsRepository.default();
    const createAlertRequestService = new _CreateAlertRequestService.default(alertsRequestsRepository);
    await createAlertRequestService.execute({
      user_id,
      request_id: requestCreated.id,
      moment: alert
    });
    return response.json((0, _classTransformer.classToClass)(requestCreated));
  }

  async index(request, response) {
    const {
      name,
      request_status_id,
      page,
      perpage
    } = request.query;
    const requestRepository = new _RequestRepository.default();
    const searchRequests = new _SearchRequests.default(requestRepository);
    const requests = await searchRequests.execute(String(name), Number(request_status_id), Number(page), Number(perpage));
    return response.json((0, _classTransformer.classToClass)(requests));
  }

  async show(request, response) {
    const requestRepository = new _RequestRepository.default();
    const showRequestService = new _ShowRequestService.default(requestRepository);
    const requests = await showRequestService.execute(request.params.id);
    return response.json((0, _classTransformer.classToClass)(requests));
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      attendant_description
    } = request.body;
    const user_id = request.user.id;
    const requestRepository = new _RequestRepository.default();
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const updateStatusRequestService = new _UpdateStatusRequestService.default(requestRepository, historyRequestsRepository);
    const requestUpdatted = await updateStatusRequestService.execute({
      attendant_description,
      request_id: id,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(requestUpdatted));
  }

}

exports.default = RequestController;