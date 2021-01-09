"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ShowByRequestAlertRequestService {
  constructor(alertsRequestsRepository) {
    this.alertsRequestsRepository = alertsRequestsRepository;
  }

  async execute(request_id) {
    const alertExists = await this.alertsRequestsRepository.findByRequestId(request_id);
    return alertExists;
  }

}

var _default = ShowByRequestAlertRequestService;
exports.default = _default;