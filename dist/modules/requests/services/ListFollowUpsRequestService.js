"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ListFollowUpsRequestService {
  constructor(followUpRequestsRepository) {
    this.followUpRequestsRepository = followUpRequestsRepository;
  }

  async execute(data) {
    const {
      request_type_id,
      request_status_id,
      name,
      page,
      perpage
    } = data;
    const followUps = await this.followUpRequestsRepository.search(request_type_id, request_status_id, name, page, perpage);
    return followUps;
  }

}

var _default = ListFollowUpsRequestService;
exports.default = _default;