"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _IndicatorsByYearController = _interopRequireDefault(require("../controllers/IndicatorsByYearController"));

var _IndicatorsByMonthController = _interopRequireDefault(require("../controllers/IndicatorsByMonthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indicatorsRoutes = (0, _express.Router)();
const indicatorsByYearController = new _IndicatorsByYearController.default();
const indicatorsByMonthController = new _IndicatorsByMonthController.default();
indicatorsRoutes.get('/by-year', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    year: _celebrate.Joi.number().required()
  }
}), indicatorsByYearController.index);
indicatorsRoutes.get('/by-month', (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    month: _celebrate.Joi.number().required(),
    year: _celebrate.Joi.number().required()
  }
}), indicatorsByMonthController.index);
var _default = indicatorsRoutes;
exports.default = _default;