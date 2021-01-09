"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ListHistoriesByRequestService {
  constructor(historyRequestsRepository) {
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(request_id) {
    const histories = await this.historyRequestsRepository.listByRequestId(request_id);
    return histories;
  }

}

var _default = ListHistoriesByRequestService;
exports.default = _default;