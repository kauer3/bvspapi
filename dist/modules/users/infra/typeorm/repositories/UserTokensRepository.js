"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _UserToken = _interopRequireDefault(require("../entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UserTokensRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_UserToken.default);
  }

  async generate({
    user_id,
    mobile_code
  }) {
    const userToken = this.ormRepository.create({
      user_id,
      mobile_code
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  async findByToken(token) {
    const userToken = await this.ormRepository.findOne({
      where: {
        token
      }
    });
    return userToken;
  }

  async findByMobileCode(mobileCode) {
    const response = await this.ormRepository.findOne({
      where: {
        mobile_code: mobileCode
      }
    });
    return response;
  }

}

var _default = UserTokensRepository;
exports.default = _default;