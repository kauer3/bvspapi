"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _CreateTechnicalRequestService = _interopRequireDefault(require("../../../services/CreateTechnicalRequestService"));

var _ShowTechnicalRequestService = _interopRequireDefault(require("../../../services/ShowTechnicalRequestService"));

var _UpdateTechnicalRequestService = _interopRequireDefault(require("../../../services/UpdateTechnicalRequestService"));

var _TechnicalRequestRepository = _interopRequireDefault(require("../../typeorm/repositories/TechnicalRequestRepository"));

var _HistoryRequestsRepository = _interopRequireDefault(require("../../typeorm/repositories/HistoryRequestsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TechnicalRequestsController {
  async create(request, response) {
    const {
      request_id
    } = request.body;
    const user_id = request.user.id;
    const technicalRequestRepository = new _TechnicalRequestRepository.default();
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const createTechnicalRequestService = new _CreateTechnicalRequestService.default(technicalRequestRepository, historyRequestsRepository);
    const tech = await createTechnicalRequestService.execute({
      request_id,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(tech));
  }

  async show(request, response) {
    const {
      request_id
    } = request.params;
    const technicalRequestRepository = new _TechnicalRequestRepository.default();
    const showTechnicalRequestService = new _ShowTechnicalRequestService.default(technicalRequestRepository);
    const technical = await showTechnicalRequestService.execute(request_id);
    return response.json((0, _classTransformer.classToClass)(technical));
  }

  async save(request, response) {
    const {
      request_id
    } = request.params;
    const user_id = request.user.id;
    const {
      description
    } = request.body;
    const technicalRequestRepository = new _TechnicalRequestRepository.default();
    const historyRequestsRepository = new _HistoryRequestsRepository.default();
    const updateTechnicalRequestService = new _UpdateTechnicalRequestService.default(technicalRequestRepository, historyRequestsRepository);
    const sale = await updateTechnicalRequestService.execute({
      request_id,
      user_id,
      description
    });
    return response.json((0, _classTransformer.classToClass)(sale));
  }

}

exports.default = TechnicalRequestsController;