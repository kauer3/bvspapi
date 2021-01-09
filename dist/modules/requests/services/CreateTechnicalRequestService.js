"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CreateTechnicalRequestService {
  constructor(technicalRequestsRepository, historyRequestsRepository) {
    this.technicalRequestsRepository = technicalRequestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      user_id,
      request_id
    } = data;
    const techExists = await this.technicalRequestsRepository.findByRequestId(request_id);

    if (techExists) {
      return techExists;
    }

    const techRequest = await this.technicalRequestsRepository.create({
      request_id,
      user_id
    });
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Solicitação encaminhada para atendimento técnico'
    });
    return techRequest;
  }

}

var _default = CreateTechnicalRequestService;
exports.default = _default;