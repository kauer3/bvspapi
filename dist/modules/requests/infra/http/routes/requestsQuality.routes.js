"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _QualityRequestsController = _interopRequireDefault(require("../controllers/QualityRequestsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsQuality = (0, _express.Router)();
const qualityRequestsController = new _QualityRequestsController.default();
requestsQuality.put('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    description: _celebrate.Joi.string().required().allow(null, ''),
    rnc: _celebrate.Joi.string().allow(null, ''),
    proceed: _celebrate.Joi.number().allow(null, 0)
  }
}), qualityRequestsController.update);
requestsQuality.get('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  }
}), qualityRequestsController.show);
var _default = requestsQuality;
exports.default = _default;