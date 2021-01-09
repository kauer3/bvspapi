"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CreateQualityRequestService {
  constructor(qualityRequestsRepository, historyRequestsRepository) {
    this.qualityRequestsRepository = qualityRequestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      user_id,
      request_id
    } = data;
    const qualityExists = await this.qualityRequestsRepository.findByRequestId(request_id);

    if (qualityExists) {
      return qualityExists;
    }

    const qualityRequest = await this.qualityRequestsRepository.create({
      request_id,
      user_id
    });
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Solicitação encaminhada para Qualidade'
    });
    return qualityRequest;
  }

}

var _default = CreateQualityRequestService;
exports.default = _default;