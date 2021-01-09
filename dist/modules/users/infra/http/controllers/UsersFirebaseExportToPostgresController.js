"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserRepository = _interopRequireDefault(require("../../typeorm/repositories/UserRepository"));

var _BCryptHashProvider = _interopRequireDefault(require("../../../providers/HashProvider/implementations/BCryptHashProvider"));

var _UserExportGogleFirestoreToPostgres = _interopRequireDefault(require("../../../services/UserExportGogleFirestoreToPostgres"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { classToClass } from 'class-transformer';
class UsersFirebaseExportToPostgresController {
  async create(request, response) {
    const userRepository = new _UserRepository.default();
    const bCryptHashProvider = new _BCryptHashProvider.default();
    const userExportGogleFirestoreToPostgres = new _UserExportGogleFirestoreToPostgres.default(userRepository, bCryptHashProvider);
    const user = await userExportGogleFirestoreToPostgres.execute();
    return response.json(user);
  }

}

exports.default = UsersFirebaseExportToPostgresController;