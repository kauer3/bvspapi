"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateQualityRequestService {
  constructor(qualityRequestsRepository, historyRequestsRepository) {
    this.qualityRequestsRepository = qualityRequestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      request_id,
      description,
      user_id,
      rnc,
      proceed
    } = data;
    const qualityExists = await this.qualityRequestsRepository.findByRequestId(request_id);

    if (!qualityExists) {
      throw new _AppError.default('request not found', 404);
    }

    qualityExists.description = description;
    qualityExists.rnc = rnc;
    qualityExists.proceed = proceed;
    await this.qualityRequestsRepository.save(qualityExists);
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Atendimento de qualidade Atualizado'
    });
    return qualityExists;
  }

}

var _default = UpdateQualityRequestService;
exports.default = _default;