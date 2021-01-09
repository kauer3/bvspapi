"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _HistoryRequestController = _interopRequireDefault(require("../controllers/HistoryRequestController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsHistory = (0, _express.Router)();
const historyRequestController = new _HistoryRequestController.default();
requestsHistory.get('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().required()
  }
}), historyRequestController.index);
var _default = requestsHistory;
exports.default = _default;