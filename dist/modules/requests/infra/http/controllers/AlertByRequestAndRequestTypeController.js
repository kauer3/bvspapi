"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _AlertsRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/AlertsRequestsRepository"));

var _AlertsTodayByTypeRequestService = _interopRequireDefault(require("../../../services/AlertsTodayByTypeRequestService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AlertByRequestAndRequestTypeController {
  async index(request, response) {
    const {
      request_type_id,
      date,
      page,
      perpage
    } = request.params;
    const alertsRequestsRepository = new _AlertsRequestsRepository.default();
    const alertsTodayByTypeRequestService = new _AlertsTodayByTypeRequestService.default(alertsRequestsRepository);
    const alerts = await alertsTodayByTypeRequestService.execute({
      request_type_id,
      date: new Date(date),
      page: Number(page),
      perPage: Number(perpage)
    });
    return response.json((0, _classTransformer.classToClass)(alerts));
  }

}

exports.default = AlertByRequestAndRequestTypeController;