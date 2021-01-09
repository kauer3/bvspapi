"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ListRequestsByUserService {
  constructor(requestsRepository) {
    this.requestsRepository = requestsRepository;
  }

  async execute(userId, page, perpage) {
    const requests = await this.requestsRepository.listByUserId(userId, page, perpage);
    return requests;
  }

}

var _default = ListRequestsByUserService;
exports.default = _default;