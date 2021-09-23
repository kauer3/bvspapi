"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AlertController = _interopRequireDefault(require("../controllers/AlertController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alertRequest = (0, _express.Router)();
const alertController = new _AlertController.default();
alertRequest.post('/', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    request_id: _celebrate.Joi.string().uuid().required(),
    moment: _celebrate.Joi.date().required()
  }
}), alertController.create);
alertRequest.get('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  }
}), alertController.show);
var _default = alertRequest;
exports.default = _default;