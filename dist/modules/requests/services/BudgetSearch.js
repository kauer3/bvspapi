"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class BudgetSearch {
  constructor(budgetRequestsRepository) {
    this.budgetRequestsRepository = budgetRequestsRepository;
  }

  async execute(name = '', requestStatusId, page, perpage) {
    const budgets = await this.budgetRequestsRepository.search(name, requestStatusId, page, perpage);
    return budgets;
  }

}

var _default = BudgetSearch;
exports.default = _default;