"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowTechnicalRequestService {
  constructor(technicalRequestsRepository) {
    this.technicalRequestsRepository = technicalRequestsRepository;
  }

  async execute(request_id) {
    const technicalExists = await this.technicalRequestsRepository.findByRequestId(request_id);

    if (!technicalExists) {
      throw new _AppError.default('request not found', 404);
    }

    return technicalExists;
  }

}

var _default = ShowTechnicalRequestService;
exports.default = _default;