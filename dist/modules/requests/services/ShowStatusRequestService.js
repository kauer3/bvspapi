"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ShowStatusRequestService {
  constructor(followUpRequestsRepository) {
    this.followUpRequestsRepository = followUpRequestsRepository;
  }

  async execute(request_id) {
    const followups = await this.followUpRequestsRepository.listByRequestId(request_id);
    if (followups.length === 0) return 'EM ABERTO';
    const processing = followups.filter(follow => follow.request_status_id === 2);
    if (processing.length > 0) return 'EM ANDAMENTO';
    return 'CONCLUÍDO';
  }

}

var _default = ShowStatusRequestService;
exports.default = _default;