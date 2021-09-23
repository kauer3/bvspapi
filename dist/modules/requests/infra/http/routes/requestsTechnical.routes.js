"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _TechnicalRequestsController = _interopRequireDefault(require("../controllers/TechnicalRequestsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsTechnical = (0, _express.Router)();
const technicalRequestsController = new _TechnicalRequestsController.default();
requestsTechnical.post('/', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    request_id: _celebrate.Joi.string().uuid().required()
  }
}), technicalRequestsController.create);
requestsTechnical.get('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  }
}), technicalRequestsController.show);
requestsTechnical.put('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    description: _celebrate.Joi.string().required().allow(null, '')
  }
}), technicalRequestsController.save);
var _default = requestsTechnical;
exports.default = _default;