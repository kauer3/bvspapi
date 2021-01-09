"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _CreateSaleRequestService = _interopRequireDefault(require("../../../services/CreateSaleRequestService"));

var _ShowSaleRequestService = _interopRequireDefault(require("../../../services/ShowSaleRequestService"));

var _UpdateSaleRequestService = _interopRequireDefault(require("../../../services/UpdateSaleRequestService"));

var _SaleRequestRepository = _interopRequireDefault(require("../../typeorm/repositories/SaleRequestRepository"));

var _HistoryRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/HistoryRequestsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SaleRequestsController {
  async create(request, response) {
    const {
      request_id
    } = request.body;
    const user_id = request.user.id;
    const saleRequestRepository = new _SaleRequestRepository.default();
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const createSaleRequestService = new _CreateSaleRequestService.default(saleRequestRepository, historyRequestsRepository);
    const sale = await createSaleRequestService.execute({
      request_id,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(sale));
  }

  async update(request, response) {
    const {
      description,
      budget_number
    } = request.body;
    const {
      request_id
    } = request.params;
    const user_id = request.user.id;
    const saleRequestRepository = new _SaleRequestRepository.default();
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const updateSaleRequestService = new _UpdateSaleRequestService.default(saleRequestRepository, historyRequestsRepository);
    const budgets = await updateSaleRequestService.execute({
      description,
      budget_number,
      request_id,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(budgets));
  }

  async show(request, response) {
    const {
      request_id
    } = request.params;
    const saleRequestRepository = new _SaleRequestRepository.default();
    const showSaleRequestService = new _ShowSaleRequestService.default(saleRequestRepository);
    const sale = await showSaleRequestService.execute(request_id);
    return response.json((0, _classTransformer.classToClass)(sale));
  }

}

exports.default = SaleRequestsController;