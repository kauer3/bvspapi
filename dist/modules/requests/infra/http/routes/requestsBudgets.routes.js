"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _BudgetRequestsController = _interopRequireDefault(require("../controllers/BudgetRequestsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsBudgets = (0, _express.Router)();
const budgetRequestsController = new _BudgetRequestsController.default();
requestsBudgets.get('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  }
}), budgetRequestsController.show);
requestsBudgets.put('/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    description: _celebrate.Joi.string().required().allow(null, ''),
    budget_number: _celebrate.Joi.string().required().allow(null, '')
  }
}), budgetRequestsController.update);
var _default = requestsBudgets;
exports.default = _default;