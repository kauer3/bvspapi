"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CreateHistoryRequestService {
  constructor(alertsRequestsRepository) {
    this.alertsRequestsRepository = alertsRequestsRepository;
  }

  async execute(data) {
    const {
      user_id,
      request_id,
      message_type
    } = data;
    let description = '';

    switch (message_type) {
      case 1:
        description = 'Solicitação encaminhada para Orçamento';
        break;

      default:
        description = 'Solicitação atualizada';
        break;
    }

    const history = await this.alertsRequestsRepository.create({
      request_id,
      user_id,
      description
    });
    return history;
  }

}

var _default = CreateHistoryRequestService;
exports.default = _default;