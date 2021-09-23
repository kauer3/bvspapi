"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _UserRepository = _interopRequireDefault(require("../../typeorm/repositories/UserRepository"));

var _SearchUserByEmailService = _interopRequireDefault(require("../../../services/SearchUserByEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersSearchByEmailController {
  async index(request, response) {
    const {
      email
    } = request.query;
    const userRepository = new _UserRepository.default();
    const searchUserByEmailService = new _SearchUserByEmailService.default(userRepository);
    const users = await searchUserByEmailService.execute(String(email));
    return response.json((0, _classTransformer.classToClass)(users));
  }

}

exports.default = UsersSearchByEmailController;