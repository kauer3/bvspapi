"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FindRecoveryPasswordCode {
  constructor(userTokensRepository) {
    this.userTokensRepository = userTokensRepository;
  }

  async execute(recoveryCode) {
    const token = await this.userTokensRepository.findByUserAndRecoveryCode(recoveryCode);

    if (!token) {
      throw new _AppError.default('invalid code');
    }

    return token;
  }

}

var _default = FindRecoveryPasswordCode;
exports.default = _default;