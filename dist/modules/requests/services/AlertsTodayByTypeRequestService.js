"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

class AlertsTodayByTypeRequestService {
  constructor(alertsRequestsRepository) {
    this.alertsRequestsRepository = alertsRequestsRepository;
  }

  async execute(data) {
    const {
      request_type_id,
      date,
      page,
      perPage
    } = data;
    const dateFormatted = (0, _dateFns.format)(date, 'yyyy-MM-dd 23:59:59');
    const alerts = await this.alertsRequestsRepository.listAlertsTodayByRequestType({
      request_type_id: Number(request_type_id),
      date: dateFormatted,
      page,
      perPage
    });
    return alerts;
  }

}

var _default = AlertsTodayByTypeRequestService;
exports.default = _default;