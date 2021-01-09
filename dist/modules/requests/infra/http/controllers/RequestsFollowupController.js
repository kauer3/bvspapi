"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _ListFollowUpsRequestService = _interopRequireDefault(require("../../../services/ListFollowUpsRequestService"));

var _ShowFollowUpByRequestService = _interopRequireDefault(require("../../../services/ShowFollowUpByRequestService"));

var _CreateFollowUpService = _interopRequireDefault(require("../../../services/CreateFollowUpService"));

var _CreateSaleRequestService = _interopRequireDefault(require("../../../services/CreateSaleRequestService"));

var _CreateQualityRequestService = _interopRequireDefault(require("../../../services/CreateQualityRequestService"));

var _CreateBudgetRequestService = _interopRequireDefault(require("../../../services/CreateBudgetRequestService"));

var _CreateTechnicalRequestService = _interopRequireDefault(require("../../../services/CreateTechnicalRequestService"));

var _FollowUpRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/FollowUpRequestsRepository"));

var _RequestRepository = _interopRequireDefault(require("../../typeorm/repositories/RequestRepository"));

var _HistoryRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/HistoryRequestsRepository"));

var _BudgetRequestRepository = _interopRequireDefault(require("../../typeorm/repositories/BudgetRequestRepository"));

var _QualityRepository = _interopRequireDefault(require("../../typeorm/repositories/QualityRepository"));

var _SaleRequestRepository = _interopRequireDefault(require("../../typeorm/repositories/SaleRequestRepository"));

var _TechnicalRequestRepository = _interopRequireDefault(require("../../typeorm/repositories/TechnicalRequestRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestsFollowup {
  async create(request, response) {
    const {
      request_id,
      request_type
    } = request.body;
    const user_id = request.user.id;
    const followUpRequestsRepository = new _FollowUpRequestsRepository.default();
    const requestRepository = new _RequestRepository.default();
    const createFollowUpService = new _CreateFollowUpService.default(followUpRequestsRepository, requestRepository);
    await createFollowUpService.execute({
      user_id,
      request_id,
      request_type
    }); // Second step is send request to department

    const historyRequestsRepository = new _HistoryRequestsRepository.default();

    if (request_type === 1) {
      const saleRequestRepository = new _SaleRequestRepository.default();
      const createSaleRequestService = new _CreateSaleRequestService.default(saleRequestRepository, historyRequestsRepository);
      await createSaleRequestService.execute({
        user_id,
        request_id
      });
    }

    if (request_type === 2) {
      const qualityRepository = new _QualityRepository.default();
      const createQualityRequestService = new _CreateQualityRequestService.default(qualityRepository, historyRequestsRepository);
      await createQualityRequestService.execute({
        user_id,
        request_id
      });
    }

    if (request_type === 3) {
      const budgetRequestRepository = new _BudgetRequestRepository.default();
      const createBudgetRequestService = new _CreateBudgetRequestService.default(budgetRequestRepository, historyRequestsRepository);
      await createBudgetRequestService.execute({
        user_id,
        request_id
      });
    }

    if (request_type === 4) {
      const technicalRequestRepository = new _TechnicalRequestRepository.default();
      const createTechnicalRequestService = new _CreateTechnicalRequestService.default(technicalRequestRepository, historyRequestsRepository);
      await createTechnicalRequestService.execute({
        user_id,
        request_id
      });
    }

    return response.json({
      msg: 'success'
    });
  }

  async index(request, response) {
    const {
      request_type_id,
      request_status_id,
      name,
      page,
      perpage
    } = request.query;
    const followUpRequestsRepository = new _FollowUpRequestsRepository.default();
    const listFollowUpsRequestService = new _ListFollowUpsRequestService.default(followUpRequestsRepository);
    const followUps = await listFollowUpsRequestService.execute({
      request_type_id: Number(request_type_id),
      request_status_id: Number(request_status_id),
      name: String(name),
      page: Number(page),
      perpage: Number(perpage)
    });
    return response.json((0, _classTransformer.classToClass)(followUps));
  }

  async show(request, response) {
    const followUpRequestsRepository = new _FollowUpRequestsRepository.default();
    const showFollowUpByRequestService = new _ShowFollowUpByRequestService.default(followUpRequestsRepository);
    const followUps = await showFollowUpByRequestService.execute(request.params.request_id, Number(request.params.request_type_id));
    return response.json((0, _classTransformer.classToClass)(followUps));
  }

}

exports.default = RequestsFollowup;