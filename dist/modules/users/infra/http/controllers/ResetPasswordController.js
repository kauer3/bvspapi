"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ResetPasswordService = _interopRequireDefault(require("../../../services/ResetPasswordService"));

var _UserRepository = _interopRequireDefault(require("../../firebase/repositories/UserRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../firebase/repositories/UserTokensRepository"));

var _BCryptHashProvider = _interopRequireDefault(require("../../../providers/HashProvider/implementations/BCryptHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(request, response) {
    const {
      password,
      token
    } = request.body;
    const userRepository = new _UserRepository.default();
    const userTokensRepository = new _UserTokensRepository.default();
    const hashProvider = new _BCryptHashProvider.default();
    const resetPassword = new _ResetPasswordService.default(userRepository, userTokensRepository, hashProvider);
    await resetPassword.execute({
      password,
      token
    });
    return response.status(204).json();
  }

}

exports.default = ResetPasswordController;