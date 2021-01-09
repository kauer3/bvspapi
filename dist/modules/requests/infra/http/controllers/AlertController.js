"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _AlertsRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/AlertsRequestsRepository"));

var _CreateAlertRequestService = _interopRequireDefault(require("../../../services/CreateAlertRequestService"));

var _ShowByRequestAlertRequestService = _interopRequireDefault(require("../../../services/ShowByRequestAlertRequestService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AlertController {
  async create(request, response) {
    const {
      request_id,
      moment
    } = request.body;
    const user_id = request.user.id;
    const alertsRequestsRepository = new _AlertsRequestsRepository.default();
    const createAlertRequestService = new _CreateAlertRequestService.default(alertsRequestsRepository);
    const requestCreated = await createAlertRequestService.execute({
      user_id,
      request_id,
      moment
    });
    return response.json((0, _classTransformer.classToClass)(requestCreated));
  }

  async show(request, response) {
    const {
      request_id
    } = request.params;
    const alertsRequestsRepository = new _AlertsRequestsRepository.default();
    const showByRequestAlertRequestService = new _ShowByRequestAlertRequestService.default(alertsRequestsRepository);
    const alert = await showByRequestAlertRequestService.execute(request_id);
    return response.json((0, _classTransformer.classToClass)(alert));
  }

}

exports.default = AlertController;