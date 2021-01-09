"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateSaleRequestService {
  constructor(saleRequestsRepository, historyRequestsRepository) {
    this.saleRequestsRepository = saleRequestsRepository;
    this.historyRequestsRepository = historyRequestsRepository;
  }

  async execute(data) {
    const {
      request_id,
      description,
      user_id
    } = data;
    const saleExists = await this.saleRequestsRepository.findByRequestId(request_id);

    if (!saleExists) {
      throw new _AppError.default('request not found', 404);
    }

    saleExists.description = description;
    await this.saleRequestsRepository.save(saleExists);
    await this.historyRequestsRepository.create({
      request_id,
      user_id,
      description: 'Venda atualizada'
    });
    return saleExists;
  }

}

var _default = UpdateSaleRequestService;
exports.default = _default;