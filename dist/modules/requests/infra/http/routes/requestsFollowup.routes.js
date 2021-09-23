"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _RequestsFollowupController = _interopRequireDefault(require("../controllers/RequestsFollowupController"));

var _RequestsGetFollowupController = _interopRequireDefault(require("../controllers/RequestsGetFollowupController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsFollowup = (0, _express.Router)();
const requestsFollowupController = new _RequestsFollowupController.default();
const requestsGetFollowupController = new _RequestsGetFollowupController.default();
requestsFollowup.post('/', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    request_type: _celebrate.Joi.number().allow(null, 0),
    request_id: _celebrate.Joi.string().uuid().required(),
    attendant_description: _celebrate.Joi.string().allow(null, ''),
    alert: _celebrate.Joi.string().allow(null, null)
  }
}), requestsFollowupController.create);
requestsFollowup.get('/:request_id/:request_type_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().required(),
    request_type_id: _celebrate.Joi.number().required()
  }
}), requestsFollowupController.show);
requestsFollowup.get('/by/request-id/:request_id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    request_id: _celebrate.Joi.string().required()
  }
}), requestsGetFollowupController.index);
requestsFollowup.get('/search-all', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    request_type_id: _celebrate.Joi.number().required(),
    request_status_id: _celebrate.Joi.number().required(),
    name: _celebrate.Joi.string().allow(null, ''),
    page: _celebrate.Joi.number().required(),
    perpage: _celebrate.Joi.number().required()
  }
}), requestsFollowupController.index);
var _default = requestsFollowup;
exports.default = _default;