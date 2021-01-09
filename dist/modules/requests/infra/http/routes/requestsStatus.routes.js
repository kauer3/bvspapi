"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _StatusRequestsController = _interopRequireDefault(require("../controllers/StatusRequestsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsStatus = (0, _express.Router)();
const statusRequestsController = new _StatusRequestsController.default();
requestsStatus.get('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  }
}), statusRequestsController.show);
var _default = requestsStatus;
exports.default = _default;