"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AlertByRequestAndRequestTypeController = _interopRequireDefault(require("../controllers/AlertByRequestAndRequestTypeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const alertsTodayByTypeRequestRouter = (0, _express.Router)();
const alertByRequestAndRequestTypeController = new _AlertByRequestAndRequestTypeController.default();
alertsTodayByTypeRequestRouter.get('/:request_type_id/:date/:page/:perpage', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_type_id: _celebrate.Joi.number().required(),
    date: _celebrate.Joi.date().required(),
    page: _celebrate.Joi.number().required(),
    perpage: _celebrate.Joi.number().required()
  }
}), alertByRequestAndRequestTypeController.index);
var _default = alertsTodayByTypeRequestRouter;
exports.default = _default;