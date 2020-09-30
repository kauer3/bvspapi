"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HandlebarsMailTemplateProvider = _interopRequireDefault(require("../../../../../shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider"));

var _EtherealMailProvider = _interopRequireDefault(require("../../../../../shared/container/providers/MailProvider/implementations/EtherealMailProvider"));

var _BCryptHashProvider = _interopRequireDefault(require("../../../providers/HashProvider/implementations/BCryptHashProvider"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("../../../services/SendForgotPasswordEmailService"));

var _UserRepository = _interopRequireDefault(require("../../firebase/repositories/UserRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../firebase/repositories/UserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForgotPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body;
    const mailTemplateProvider = new _HandlebarsMailTemplateProvider.default();
    const mailProvider = new _EtherealMailProvider.default(mailTemplateProvider);
    const hashProvider = new _BCryptHashProvider.default();
    const userRepository = new _UserRepository.default();
    const userTokensRepository = new _UserTokensRepository.default();
    const sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(userRepository, mailProvider, userTokensRepository, hashProvider);
    await sendForgotPasswordEmail.execute({
      email
    });
    return response.status(204).json();
  }

}

exports.default = ForgotPasswordController;