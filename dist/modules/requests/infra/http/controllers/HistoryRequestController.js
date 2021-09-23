"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _ListHistoriesByRequestService = _interopRequireDefault(require("../../../services/ListHistoriesByRequestService"));

var _HistoryRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/HistoryRequestsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HistoryRequestController {
  async index(request, response) {
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const listHistoriesByRequestService = new _ListHistoriesByRequestService.default(historyRequestsRepository);
    const histories = await listHistoriesByRequestService.execute(request.params.request_id);
    return response.json((0, _classTransformer.classToClass)(histories));
  }

}

exports.default = HistoryRequestController;