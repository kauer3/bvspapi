"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));

var _UserRepository = _interopRequireDefault(require("../../typeorm/repositories/UserRepository"));

var _BCryptHashProvider = _interopRequireDefault(require("../../../providers/HashProvider/implementations/BCryptHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;
    const userRepository = new _UserRepository.default();
    const bCryptHashProvider = new _BCryptHashProvider.default();
    const authenticateUser = new _AuthenticateUserService.default(userRepository, bCryptHashProvider);
    const {
      user,
      token
    } = await authenticateUser.execute({
      email,
      password
    });
    return response.json({
      user,
      token
    });
  }

}

exports.default = SessionsController;