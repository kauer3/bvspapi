"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowQualityRequestService {
  constructor(qualityRequestsRepository) {
    this.qualityRequestsRepository = qualityRequestsRepository;
  }

  async execute(request_id) {
    const qualityExists = await this.qualityRequestsRepository.findByRequestId(request_id);

    if (!qualityExists) {
      throw new _AppError.default('request not found', 404);
    }

    return qualityExists;
  }

}

var _default = ShowQualityRequestService;
exports.default = _default;