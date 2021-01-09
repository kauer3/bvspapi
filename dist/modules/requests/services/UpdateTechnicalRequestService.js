"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateTechnicalRequestService {
  constructor(technicalRequestsRepository, historyRequestsRepository) {
    this.technicalRequestsRepository = technicalRequestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      request_id,
      description,
      user_id
    } = data;
    const saleExists = await this.technicalRequestsRepository.findByRequestId(request_id);

    if (!saleExists) {
      throw new _AppError.default('request not found', 404);
    }

    saleExists.description = description;
    await this.technicalRequestsRepository.save(saleExists);
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Atendimento técnico atualizado'
    });
    return saleExists;
  }

}

var _default = UpdateTechnicalRequestService;
exports.default = _default;