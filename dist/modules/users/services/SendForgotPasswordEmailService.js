"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SendForgotPasswordEmailService {
  constructor(usersRepository, mailProvider, userTokensRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.userTokensRepository = userTokensRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    email
  }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default('User does not exists');
    }

    const mobileCode = Math.floor(1000 + Math.random() * 9000);
    const {
      token
    } = await this.userTokensRepository.generate({
      user_id: user.id,
      mobile_code: mobileCode
    });

    const forgotPasswordTemplate = _path.default.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[BVSP] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
          code: mobileCode
        }
      }
    });
  }

}

var _default = SendForgotPasswordEmailService;
exports.default = _default;