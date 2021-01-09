"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CreateBudgetRequestService {
  constructor(budgetRequestsRepository, historyRequestsRepository) {
    this.budgetRequestsRepository = budgetRequestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      user_id,
      request_id
    } = data;
    const budgetExists = await this.budgetRequestsRepository.findByRequestId(request_id);

    if (budgetExists) {
      return budgetExists;
    }

    const budgetRequest = await this.budgetRequestsRepository.create({
      request_id,
      user_id
    });
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Solicitação encaminhada para Orçamento'
    });
    return budgetRequest;
  }

}

var _default = CreateBudgetRequestService;
exports.default = _default;