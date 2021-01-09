"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AlertCountTodayController = _interopRequireDefault(require("../controllers/AlertCountTodayController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alertRequestCountToday = (0, _express.Router)();
const alertCountTodayController = new _AlertCountTodayController.default();
alertRequestCountToday.get('/:profile_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    profile_id: _celebrate.Joi.number().required()
  }
}), alertCountTodayController.show);
var _default = alertRequestCountToday;
exports.default = _default;