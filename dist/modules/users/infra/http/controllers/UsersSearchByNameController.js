"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _UserRepository = _interopRequireDefault(require("../../typeorm/repositories/UserRepository"));

var _SearchUserByNameService = _interopRequireDefault(require("../../../services/SearchUserByNameService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersSearchByNameController {
  async index(request, response) {
    const {
      page,
      perpage,
      name = '',
      profile_id
    } = request.query;
    const userRepository = new _UserRepository.default();
    const searchUserByNameService = new _SearchUserByNameService.default(userRepository);
    const users = await searchUserByNameService.execute(String(name), Number(profile_id), Number(page), Number(perpage));
    return response.json((0, _classTransformer.classToClass)(users));
  }

}

exports.default = UsersSearchByNameController;