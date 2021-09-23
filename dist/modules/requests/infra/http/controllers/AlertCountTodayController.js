"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _AlertsRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/AlertsRequestsRepository"));

var _AlertsCountTodayByProfileService = _interopRequireDefault(require("../../../services/AlertsCountTodayByProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AlertCountTodayController {
  async show(request, response) {
    const {
      profile_id
    } = request.params;
    const alertsRequestsRepository = new _AlertsRequestsRepository.default();
    const alertsCountTodayByProfileService = new _AlertsCountTodayByProfileService.default(alertsRequestsRepository);
    const alert = await alertsCountTodayByProfileService.execute(Number(profile_id));
    return response.json((0, _classTransformer.classToClass)(alert));
  }

}

exports.default = AlertCountTodayController;