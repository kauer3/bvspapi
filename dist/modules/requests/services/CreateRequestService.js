"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CreateRequestService {
  constructor(requestsRepository) {
    this.requestsRepository = requestsRepository;
  }

  async execute(data) {
    const {
      user_id,
      contact_type_id,
      description,
      contact
    } = data;
    const request = await this.requestsRepository.create({
      user_id,
      request_status_id: 1,
      // 1 = status em aberto
      contact_type_id,
      contact,
      client_description: description
    });
    return request;
  }

}

var _default = CreateRequestService;
exports.default = _default;