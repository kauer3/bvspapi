"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ShowFollowUpByRequestService {
  constructor(followUpRequestsRepository) {
    this.followUpRequestsRepository = followUpRequestsRepository;
  }

  async execute(request_id, request_type_id) {
    const followUp = await this.followUpRequestsRepository.showByRequestAndRequestType(request_id, request_type_id);
    return followUp;
  }

}

var _default = ShowFollowUpByRequestService;
exports.default = _default;