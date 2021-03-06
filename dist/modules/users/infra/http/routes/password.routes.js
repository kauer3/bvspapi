"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ForgotPasswordController = _interopRequireDefault(require("../controllers/ForgotPasswordController"));

var _ResetPasswordController = _interopRequireDefault(require("../controllers/ResetPasswordController"));

var _RecoveryMobileCodeController = _interopRequireDefault(require("../controllers/RecoveryMobileCodeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const forgotPasswordController = new _ForgotPasswordController.default();
const resetPasswordController = new _ResetPasswordController.default();
const recoveryMobileCodeController = new _RecoveryMobileCodeController.default();
const passwordRouter = (0, _express.Router)();
passwordRouter.post('/forgot', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required()
  }
}), forgotPasswordController.create);
passwordRouter.post('/reset', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    token: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().required(),
    password_confirmation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password'))
  }
}), resetPasswordController.create);
passwordRouter.post('/recovery/mobile-code', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    mobile_code: _celebrate.Joi.number().required()
  }
}), recoveryMobileCodeController.show);
var _default = passwordRouter;
exports.default = _default;