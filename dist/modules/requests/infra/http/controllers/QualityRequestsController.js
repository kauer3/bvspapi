"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _UpdateQualityRequestService = _interopRequireDefault(require("../../../services/UpdateQualityRequestService"));

var _ShowQualityRequestService = _interopRequireDefault(require("../../../services/ShowQualityRequestService"));

var _QualityRepository = _interopRequireDefault(require("../../typeorm/repositories/QualityRepository"));

var _HistoryRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/HistoryRequestsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QualityRequestsController {
  async update(request, response) {
    const {
      description,
      rnc,
      proceed
    } = request.body;
    const {
      request_id
    } = request.params;
    const user_id = request.user.id;
    const qualityRepository = new _QualityRepository.default();
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const updateSaleRequestService = new _UpdateQualityRequestService.default(qualityRepository, historyRequestsRepository);
    const quality = await updateSaleRequestService.execute({
      description,
      rnc,
      proceed,
      request_id,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(quality));
  }

  async show(request, response) {
    const {
      request_id
    } = request.params;
    const qualityRepository = new _QualityRepository.default();
    const showQualityRequestService = new _ShowQualityRequestService.default(qualityRepository);
    const quality = await showQualityRequestService.execute(request_id);
    return response.json((0, _classTransformer.classToClass)(quality));
  }

}

exports.default = QualityRequestsController;