"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CreateSaleRequestService {
  constructor(saleRequestsRepository, historyRequestsRepository) {
    this.saleRequestsRepository = saleRequestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      user_id,
      request_id
    } = data;
    const saleExists = await this.saleRequestsRepository.findByRequestId(request_id);

    if (saleExists) {
      return saleExists;
    }

    const saleRequest = await this.saleRequestsRepository.create({
      request_id,
      user_id
    });
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Solicitação encaminhada para Vendas'
    });
    return saleRequest;
  }

}

var _default = CreateSaleRequestService;
exports.default = _default;