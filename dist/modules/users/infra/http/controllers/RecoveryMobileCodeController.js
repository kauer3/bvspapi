"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindRecoveryPasswordMobileCode = _interopRequireDefault(require("../../../services/FindRecoveryPasswordMobileCode"));

var _UserTokensRepository = _interopRequireDefault(require("../../typeorm/repositories/UserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RecoveryMobileCodeController {
  async show(request, response) {
    const {
      mobile_code
    } = request.body;
    const userTokensRepository = new _UserTokensRepository.default();
    const findRecoveryPasswordMobileCode = new _FindRecoveryPasswordMobileCode.default(userTokensRepository);
    const token = await findRecoveryPasswordMobileCode.execute(mobile_code);
    return response.json({
      token
    });
  }

}

exports.default = RecoveryMobileCodeController;