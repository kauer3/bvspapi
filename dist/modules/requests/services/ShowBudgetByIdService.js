"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ShowBudgetByIdService {
  constructor(budgetRequestsRepository) {
    this.budgetRequestsRepository = budgetRequestsRepository;
  }

  async execute(id) {
    const budget = await this.budgetRequestsRepository.findByRequestId(id);
    return budget;
  }

}

var _default = ShowBudgetByIdService;
exports.default = _default;