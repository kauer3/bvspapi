"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateStatusRequestService {
  constructor(requestsRepository, historyRequestsRepository) {
    this.requestsRepository = requestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      request_id,
      attendant_description,
      user_id
    } = data;
    const request = await this.requestsRepository.findById(request_id);

    if (!request) {
      throw new _AppError.default('request not found', 404);
    }

    request.attendant_description = attendant_description;
    const requestUpdatted = await this.requestsRepository.save(request);
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Detalhes da solicitação foram atualizado'
    });
    return requestUpdatted;
  }

}

var _default = UpdateStatusRequestService;
exports.default = _default;