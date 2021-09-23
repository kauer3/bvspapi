"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _UsersFirebaseExportToPostgresController = _interopRequireDefault(require("../controllers/UsersFirebaseExportToPostgresController"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UsersSearchByEmailController = _interopRequireDefault(require("../controllers/UsersSearchByEmailController"));

var _UsersSearchByNameController = _interopRequireDefault(require("../controllers/UsersSearchByNameController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
const usersController = new _UsersController.default();
const usersSearchByEmailController = new _UsersSearchByEmailController.default();
const usersSearchByNameController = new _UsersSearchByNameController.default();
const usersFirebaseExportToPostgresController = new _UsersFirebaseExportToPostgresController.default();
usersRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    profile_id: _celebrate.Joi.number().required(),
    name: _celebrate.Joi.string().required(),
    company: _celebrate.Joi.string().required(),
    city: _celebrate.Joi.string().required(),
    city_state: _celebrate.Joi.string().required(),
    country: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required(),
    telephone: _celebrate.Joi.string().allow(null, '')
  }
}), usersController.create);
usersRoutes.get('/byemail', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    email: _celebrate.Joi.string()
  }
}), usersSearchByEmailController.index);
usersRoutes.get('/byname', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    name: _celebrate.Joi.string().allow(null, ''),
    page: _celebrate.Joi.number().required(),
    perpage: _celebrate.Joi.number().required(),
    profile_id: _celebrate.Joi.number().required()
  }
}), usersSearchByNameController.index);
usersRoutes.get('/:id', _ensureAuthenticated.default, usersController.show);
usersRoutes.put('/:id', _ensureAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    profile_id: _celebrate.Joi.number().required(),
    name: _celebrate.Joi.string().required(),
    company: _celebrate.Joi.string().required(),
    city: _celebrate.Joi.string().required(),
    city_state: _celebrate.Joi.string().required(),
    country: _celebrate.Joi.string().required(),
    telephone: _celebrate.Joi.string().allow(null, ''),
    password: _celebrate.Joi.string().allow(null, '')
  }
}), _ensureAuthenticated.default, usersController.update);
usersRoutes.delete('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), _ensureAuthenticated.default, usersController.remove);
usersRoutes.get('/export/googlefirestore/postgres', usersFirebaseExportToPostgresController.create);
var _default = usersRoutes;
exports.default = _default;