"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

class IndicatorsByYearService {
  constructor(requestsRepository) {
    this.requestsRepository = requestsRepository;
  }

  async execute(year) {
    const to = new Date(year, 0, 1);
    const from = (0, _dateFns.lastDayOfYear)(to);
    const requests = await this.requestsRepository.findByDateBetween(to, from);
    const january = requests.filter(request => request.created_at.getMonth() === 0).length;
    const february = requests.filter(request => request.created_at.getMonth() === 1).length;
    const march = requests.filter(request => request.created_at.getMonth() === 2).length;
    const april = requests.filter(request => request.created_at.getMonth() === 3).length;
    const may = requests.filter(request => request.created_at.getMonth() === 4).length;
    const june = requests.filter(request => request.created_at.getMonth() === 5).length;
    const july = requests.filter(request => request.created_at.getMonth() === 6).length;
    const august = requests.filter(request => request.created_at.getMonth() === 7).length;
    const september = requests.filter(request => request.created_at.getMonth() === 8).length;
    const october = requests.filter(request => request.created_at.getMonth() === 9).length;
    const november = requests.filter(request => request.created_at.getMonth() === 10).length;
    const december = requests.filter(request => request.created_at.getMonth() === 11).length;
    const indicators = [{
      parameter: 'Jan',
      value: january
    }, {
      parameter: 'Fev',
      value: february
    }, {
      parameter: 'Mar',
      value: march
    }, {
      parameter: 'Abr',
      value: april
    }, {
      parameter: 'Mai',
      value: may
    }, {
      parameter: 'Jun',
      value: june
    }, {
      parameter: 'Jul',
      value: july
    }, {
      parameter: 'Ago',
      value: august
    }, {
      parameter: 'Set',
      value: september
    }, {
      parameter: 'Out',
      value: october
    }, {
      parameter: 'Nov',
      value: november
    }, {
      parameter: 'Dez',
      value: december
    }];
    return indicators;
  }

}

var _default = IndicatorsByYearService;
exports.default = _default;