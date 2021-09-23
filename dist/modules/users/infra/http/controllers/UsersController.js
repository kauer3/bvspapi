"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _UserRepository = _interopRequireDefault(require("../../typeorm/repositories/UserRepository"));

var _BCryptHashProvider = _interopRequireDefault(require("../../../providers/HashProvider/implementations/BCryptHashProvider"));

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _ShowUserService = _interopRequireDefault(require("../../../services/ShowUserService"));

var _UpdateUserService = _interopRequireDefault(require("../../../services/UpdateUserService"));

var _RemoveUserService = _interopRequireDefault(require("../../../services/RemoveUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      city,
      city_state,
      company,
      country,
      telephone,
      email,
      password,
      profile_id
    } = request.body;
    const userRepository = new _UserRepository.default();
    const bCryptHashProvider = new _BCryptHashProvider.default();
    const createUserService = new _CreateUserService.default(userRepository, bCryptHashProvider);
    const user = await createUserService.execute({
      profile_id,
      name,
      city,
      city_state,
      country,
      company,
      telephone,
      email,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async show(request, response) {
    const userIdLogged = request.user.id;
    const userIdForShow = request.params.id;
    const userRepository = new _UserRepository.default();
    const showUserService = new _ShowUserService.default(userRepository);
    const users = await showUserService.execute({
      userIdLogged,
      userIdForShow
    });
    return response.json((0, _classTransformer.classToClass)(users));
  }

  async update(request, response) {
    const {
      name,
      city,
      city_state,
      company,
      country,
      email,
      password,
      profile_id,
      telephone
    } = request.body;
    const userRepository = new _UserRepository.default();
    const bCryptHashProvider = new _BCryptHashProvider.default();
    const updateUserService = new _UpdateUserService.default(userRepository, bCryptHashProvider);
    const user = await updateUserService.execute({
      id: request.params.id,
      name,
      city,
      city_state,
      company,
      country,
      email,
      password,
      profile_id,
      telephone
    });
    return response.json(user);
  }

  async remove(request, response) {
    const {
      id
    } = request.params;
    const userIdLogged = request.user.id;
    const userRepository = new _UserRepository.default();
    const removeUserService = new _RemoveUserService.default(userRepository);
    await removeUserService.execute({
      userIdRemove: id,
      userIdLogged
    });
    response.status(200).json();
  }

}

exports.default = UsersController;