"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindRecoveryPasswordCode = _interopRequireDefault(require("../../../services/FindRecoveryPasswordCode"));

var _UserTokensRepository = _interopRequireDefault(require("../../firebase/repositories/UserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RecoveryCodeController {
  async show(request, response) {
    const {
      recovery_code
    } = request.body;
    const userTokensRepository = new _UserTokensRepository.default();
    const findRecoveryPasswordCode = new _FindRecoveryPasswordCode.default(userTokensRepository);
    const token = await findRecoveryPasswordCode.execute(recovery_code);
    return response.json({
      token
    });
  }

}

exports.default = RecoveryCodeController;