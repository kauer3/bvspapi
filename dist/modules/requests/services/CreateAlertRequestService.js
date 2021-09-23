"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

class CreateAlertRequestService {
  constructor(alertsRequestsRepository) {
    this.alertsRequestsRepository = alertsRequestsRepository;
  }

  async execute(data) {
    const {
      user_id,
      request_id,
      moment
    } = data;
    console.log('REQUISIÇÃO ENVIADA PARA O ALERTA', request_id);
    const alertExists = await this.alertsRequestsRepository.findByRequestId(request_id);
    const formattedMoment = moment || (0, _dateFns.format)((0, _dateFns.addDays)(new Date(), 3), 'yyyy-MM-dd');

    if (alertExists) {
      alertExists.moment = formattedMoment;
      await this.alertsRequestsRepository.save(alertExists);
      return alertExists;
    }

    const alert = await this.alertsRequestsRepository.create({
      request_id,
      user_id,
      moment: formattedMoment
    });
    return alert;
  }

}

var _default = CreateAlertRequestService;
exports.default = _default;