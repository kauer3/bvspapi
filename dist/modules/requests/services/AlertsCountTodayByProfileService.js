"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

class AlertsCountTodayByProfileService {
  constructor(alertsRequestsRepository) {
    this.alertsRequestsRepository = alertsRequestsRepository;
  }

  async execute(profile_id) {
    const date = (0, _dateFns.format)(new Date(), 'yyyy-MM-dd 23:59:59');
    const alerts = await this.alertsRequestsRepository.countTodayByProfile(profile_id, date);
    return alerts;
  }

}

var _default = AlertsCountTodayByProfileService;
exports.default = _default;