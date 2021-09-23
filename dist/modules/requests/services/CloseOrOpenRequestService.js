"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CloseOrOpenRequestService {
  constructor(historyRequestsRepository, followUpRequestsRepository, requestsRepository) {
    this.historyRequestsRepository = historyRequestsRepository;
    this.followUpRequestsRepository = followUpRequestsRepository;
    this.requestsRepository = requestsRepository;
  }

  async execute(data) {
    const {
      request_id,
      request_type_id,
      user_id,
      action
    } = data;
    const requestFollowUp = await this.followUpRequestsRepository.findByRequestAndRequestType(request_id, request_type_id);

    if (!requestFollowUp) {
      throw new _AppError.default('request not found', 404);
    }

    const request = await this.requestsRepository.findById(request_id);

    if (!request) {
      throw new _AppError.default('request not found', 404);
    }

    requestFollowUp.request_status_id = action === 'close' ? 3 : 2;
    await this.followUpRequestsRepository.save(requestFollowUp);
    request.request_status_id = action === 'close' ? 3 : 2;
    await this.requestsRepository.save(request);
    let description = '';

    if (request_type_id === 1) {
      description = action === 'close' ? 'Venda encerrada' : 'Venda reaberta';
    }

    if (request_type_id === 2) {
      description = action === 'close' ? 'Análise de qualidade encerrada' : 'Venda reaberta';
    }

    if (request_type_id === 3) {
      description = action === 'close' ? 'Orçamento encerrado' : 'Orçamento reaberto';
    }

    if (request_type_id === 4) {
      description = action === 'close' ? 'Atendimento técnico encerrado' : 'Atendimento técnico reaberto';
    }

    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description
    });
    return requestFollowUp;
  }

}

var _default = CloseOrOpenRequestService;
exports.default = _default;