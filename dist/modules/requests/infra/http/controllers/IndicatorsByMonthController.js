"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestRepository = _interopRequireDefault(require("../../typeorm/repositories/RequestRepository"));

var _IndicatorsByMonthService = _interopRequireDefault(require("../../../services/IndicatorsByMonthService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndicatorsByMonthController {
  async index(request, response) {
    const {
      month,
      year
    } = request.query;
    const requestRepository = new _RequestRepository.default();
    const indicatorsByMonthService = new _IndicatorsByMonthService.default(requestRepository);
    const indicators = await indicatorsByMonthService.execute(Number(month), Number(year));
    return response.json(indicators);
  }

}

exports.default = IndicatorsByMonthController;