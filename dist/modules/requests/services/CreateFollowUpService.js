"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateFollowUpService {
  constructor(followUpRequestsRepository, requestsRepository) {
    this.followUpRequestsRepository = followUpRequestsRepository;
    this.requestsRepository = requestsRepository;
  }

  async execute(data) {
    const {
      user_id,
      request_type,
      request_id
    } = data;
    const request = await this.requestsRepository.findById(request_id);

    if (!request) {
      throw new _AppError.default('request not foud', 404);
    }

    request.request_status_id = 2;
    await this.requestsRepository.save(request);
    const followUpAlreadyExists = await this.followUpRequestsRepository.findByRequestAndRequestType(request_id, request_type);

    if (!followUpAlreadyExists) {
      const followUpCreated = await this.followUpRequestsRepository.create({
        request_id,
        request_type_id: request_type,
        user_id
      });
      return followUpCreated;
    }

    return followUpAlreadyExists;
  }

}

var _default = CreateFollowUpService;
exports.default = _default;