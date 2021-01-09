"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _RequestRepository = _interopRequireDefault(require("../../typeorm/repositories/RequestRepository"));

var _ListRequestsByUserService = _interopRequireDefault(require("../../../services/ListRequestsByUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestController {
  async index(request, response) {
    const userId = request.user.id;
    const {
      page,
      perpage
    } = request.query;
    const requestRepository = new _RequestRepository.default();
    const listRequestsByUserService = new _ListRequestsByUserService.default(requestRepository);
    const requests = await listRequestsByUserService.execute(userId, Number(page), Number(perpage));
    return response.json((0, _classTransformer.classToClass)(requests));
  }

}

exports.default = RequestController;