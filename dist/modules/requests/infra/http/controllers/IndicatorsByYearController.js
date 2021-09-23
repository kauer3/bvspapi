"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestRepository = _interopRequireDefault(require("../../typeorm/repositories/RequestRepository"));

var _IndicatorsByYearService = _interopRequireDefault(require("../../../services/IndicatorsByYearService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndicatorsByYearController {
  async index(request, response) {
    const {
      year
    } = request.query;
    const requestRepository = new _RequestRepository.default();
    const indicatorsByYearService = new _IndicatorsByYearService.default(requestRepository);
    const indicators = await indicatorsByYearService.execute(Number(year));
    return response.json(indicators);
  }

}

exports.default = IndicatorsByYearController;