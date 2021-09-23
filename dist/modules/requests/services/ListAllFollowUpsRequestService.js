"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ListAllFollowUpsRequestService {
  constructor(followUpRequestsRepository) {
    this.followUpRequestsRepository = followUpRequestsRepository;
  }

  async execute(request_id) {
    const followUps = await this.followUpRequestsRepository.listByRequestId(request_id);
    return followUps;
  }

}

var _default = ListAllFollowUpsRequestService;
exports.default = _default;