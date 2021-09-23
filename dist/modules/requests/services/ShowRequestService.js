"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowRequestService {
  constructor(requestsRepository) {
    this.requestsRepository = requestsRepository;
  }

  async execute(requestId) {
    const request = await this.requestsRepository.showById(requestId);

    if (!request) {
      throw new _AppError.default('request not exists');
    }

    return request;
  }

}

var _default = ShowRequestService;
exports.default = _default;