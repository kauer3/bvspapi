"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateBudgetRequestService {
  constructor(budgetRequestsRepository, historyRequestsRepository) {
    this.budgetRequestsRepository = budgetRequestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      request_id,
      description,
      user_id,
      budget_number
    } = data;
    const budgetExists = await this.budgetRequestsRepository.findByRequestId(request_id);

    if (!budgetExists) {
      throw new _AppError.default('request not found', 404);
    }

    budgetExists.description = description;
    budgetExists.budget_number = budget_number;
    const budgetRequest = await this.budgetRequestsRepository.save(budgetExists);
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Orçamento Atualizado'
    });
    return budgetRequest;
  }

}

var _default = UpdateBudgetRequestService;
exports.default = _default;