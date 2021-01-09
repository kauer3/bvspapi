"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FindRecoveryPasswordMobileCode {
  constructor(userTokensRepository) {
    this.userTokensRepository = userTokensRepository;
  }

  async execute(mobileCode) {
    const token = await this.userTokensRepository.findByMobileCode(mobileCode);

    if (!token) {
      throw new _AppError.default('invalid code', 404);
    }

    return token.token;
  }

}

var _default = FindRecoveryPasswordMobileCode;
exports.default = _default;