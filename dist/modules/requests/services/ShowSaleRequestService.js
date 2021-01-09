"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowSaleRequestService {
  constructor(saleRequestsRepository) {
    this.saleRequestsRepository = saleRequestsRepository;
  }

  async execute(request_id) {
    const saleExists = await this.saleRequestsRepository.findByRequestId(request_id);

    if (!saleExists) {
      throw new _AppError.default('request not found', 404);
    }

    return saleExists;
  }

}

var _default = ShowSaleRequestService;
exports.default = _default;