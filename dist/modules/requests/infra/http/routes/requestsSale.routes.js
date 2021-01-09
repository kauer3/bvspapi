"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _SaleRequestsController = _interopRequireDefault(require("../controllers/SaleRequestsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsSale = (0, _express.Router)();
const saleRequestsController = new _SaleRequestsController.default();
requestsSale.post('/', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    request_id: _celebrate.Joi.string().uuid().required()
  }
}), saleRequestsController.create);
requestsSale.put('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    description: _celebrate.Joi.string().required().allow(null, '')
  }
}), saleRequestsController.update);
requestsSale.get('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  }
}), saleRequestsController.show);
var _default = requestsSale;
exports.default = _default;