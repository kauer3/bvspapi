"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

class IndicatorsByMonthService {
  constructor(requestsRepository) {
    this.requestsRepository = requestsRepository;
  }

  async execute(month, year) {
    const to = new Date(year, month - 1, 1);
    const from = (0, _dateFns.lastDayOfMonth)(to);
    const requests = await this.requestsRepository.findByDateBetween(to, from);
    const days = Array.from(new Array((0, _dateFns.getDaysInMonth)(to))).map((_, index) => index + 1);
    const indicators = days.map(day => {
      return {
        parameter: day,
        value: requests.filter(request => request.created_at.getDate() === day).length
      };
    });
    return indicators;
  }

}

var _default = IndicatorsByMonthService;
exports.default = _default;