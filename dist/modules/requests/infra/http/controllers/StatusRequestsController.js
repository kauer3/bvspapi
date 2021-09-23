"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowStatusRequestService = _interopRequireDefault(require("../../../services/ShowStatusRequestService"));

var _FollowUpRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/FollowUpRequestsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StatusRequestsController {
  async show(request, response) {
    const {
      request_id
    } = request.params;
    console.log(request_id);
    const followUpRequestsRepository = new _FollowUpRequestsRepository.default();
    const showStatusRequestService = new _ShowStatusRequestService.default(followUpRequestsRepository);
    const status = await showStatusRequestService.execute(request_id);
    return response.json(status);
  }

}

exports.default = StatusRequestsController;