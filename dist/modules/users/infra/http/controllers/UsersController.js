"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserRepository = _interopRequireDefault(require("../../firebase/repositories/UserRepository"));

var _BCryptHashProvider = _interopRequireDefault(require("../../../providers/HashProvider/implementations/BCryptHashProvider"));

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      city,
      company,
      country,
      email,
      password
    } = request.body;
    const userRepository = new _UserRepository.default();
    const bCryptHashProvider = new _BCryptHashProvider.default();
    const createUserService = new _CreateUserService.default(userRepository, bCryptHashProvider);
    const user = await createUserService.execute({
      name,
      city,
      company,
      country,
      email,
      password
    });
    return response.json(user);
  }

}

exports.default = UsersController;