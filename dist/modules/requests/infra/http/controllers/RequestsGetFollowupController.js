"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _ListAllFollowUpsRequestService = _interopRequireDefault(require("../../../services/ListAllFollowUpsRequestService"));

var _FollowUpRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/FollowUpRequestsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestsGetFollowupController {
  async index(request, response) {
    const {
      request_id
    } = request.params;
    const followUpRequestsRepository = new _FollowUpRequestsRepository.default();
    const listAllFollowUpsRequestService = new _ListAllFollowUpsRequestService.default(followUpRequestsRepository);
    const followUps = await listAllFollowUpsRequestService.execute(String(request_id));
    return response.json((0, _classTransformer.classToClass)(followUps));
  }

}

exports.default = RequestsGetFollowupController;