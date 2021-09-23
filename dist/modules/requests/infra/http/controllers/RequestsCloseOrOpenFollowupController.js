"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _CloseOrOpenRequestService = _interopRequireDefault(require("../../../services/CloseOrOpenRequestService"));

var _FollowUpRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/FollowUpRequestsRepository"));

var _HistoryRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/HistoryRequestsRepository"));

var _RequestRepository = _interopRequireDefault(require("../../typeorm/repositories/RequestRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestsCloseOrOpenFollowupController {
  async create(request, response) {
    const {
      request_id,
      request_type_id,
      action
    } = request.body;
    const user_id = request.user.id;
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const followUpRequestsRepository = new _FollowUpRequestsRepository.default();
    const requestRepository = new _RequestRepository.default();
    const closeOrOpenRequestService = new _CloseOrOpenRequestService.default(historyRequestsRepository, followUpRequestsRepository, requestRepository);
    const flowupRequest = await closeOrOpenRequestService.execute({
      request_id,
      request_type_id,
      user_id,
      action
    });
    return response.json((0, _classTransformer.classToClass)(flowupRequest));
  }

}

exports.default = RequestsCloseOrOpenFollowupController;