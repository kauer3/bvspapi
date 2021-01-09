"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _ShowBudgetByIdService = _interopRequireDefault(require("../../../services/ShowBudgetByIdService"));

var _UpdateBudgetRequestService = _interopRequireDefault(require("../../../services/UpdateBudgetRequestService"));

var _BudgetRequestRepository = _interopRequireDefault(require("../../typeorm/repositories/BudgetRequestRepository"));

var _HistoryRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/HistoryRequestsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BudgetRequestsController {
  async show(request, response) {
    const budgetRequestRepository = new _BudgetRequestRepository.default();
    const showBudgetByIdService = new _ShowBudgetByIdService.default(budgetRequestRepository);
    const budget = await showBudgetByIdService.execute(request.params.request_id);
    return response.json((0, _classTransformer.classToClass)(budget));
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
    const budgetRequestRepository = new _BudgetRequestRepository.default();
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const updateBudgetRequestService = new _UpdateBudgetRequestService.default(budgetRequestRepository, historyRequestsRepository);
    const budgets = await updateBudgetRequestService.execute({
      description,
      budget_number,
      request_id,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(budgets));
  }

}

exports.default = BudgetRequestsController;