"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _RequestController = _interopRequireDefault(require("../controllers/RequestController"));

var _RequestUserController = _interopRequireDefault(require("../controllers/RequestUserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestsRoutes = (0, _express.Router)();
const requestController = new _RequestController.default();
const requestUserController = new _RequestUserController.default();
requestsRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    user_id: _celebrate.Joi.string().uuid().required(),
    contact_type_id: _celebrate.Joi.number().required(),
    contact: _celebrate.Joi.string().required(),
    description: _celebrate.Joi.string().required(),
    request_type: _celebrate.Joi.number().required(),
    alert: _celebrate.Joi.date().allow(null, '')
  }
}), requestController.create);
requestsRoutes.get('/', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    name: _celebrate.Joi.string().allow(null, ''),
    request_status_id: _celebrate.Joi.number().required(),
    page: _celebrate.Joi.number().required(),
    perpage: _celebrate.Joi.number().required()
  }
}), requestController.index);
requestsRoutes.get('/byuser', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    page: _celebrate.Joi.number().required(),
    perpage: _celebrate.Joi.number().required()
  }
}), requestUserController.index);
requestsRoutes.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), requestController.show);
requestsRoutes.put('/:id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    attendant_description: _celebrate.Joi.string().required().allow(null, '')
  }
}), requestController.update);
var _default = requestsRoutes;
exports.default = _default;