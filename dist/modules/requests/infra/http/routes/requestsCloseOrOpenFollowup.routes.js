"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _RequestsCloseOrOpenFollowupController = _interopRequireDefault(require("../controllers/RequestsCloseOrOpenFollowupController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsCloseOrOpenFollowup = (0, _express.Router)();
const requestsCloseOrOpenFollowupController = new _RequestsCloseOrOpenFollowupController.default();
requestsCloseOrOpenFollowup.post('/', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    request_id: _celebrate.Joi.string().uuid().required(),
    request_type_id: _celebrate.Joi.number().required(),
    action: _celebrate.Joi.string().required()
  }
}), requestsCloseOrOpenFollowupController.create);
var _default = requestsCloseOrOpenFollowup;
exports.default = _default;