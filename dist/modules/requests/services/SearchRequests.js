"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ListRequestsByUserService {
  constructor(requestsRepository) {
    this.requestsRepository = requestsRepository;
  }

  async execute(name = '', requestStatusId, page, perpage) {
    const requests = await this.requestsRepository.search(name, requestStatusId, page, perpage);
    return requests;
  }

}

var _default = ListRequestsByUserService;
exports.default = _default;