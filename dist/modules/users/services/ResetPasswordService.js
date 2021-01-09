"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordService {
  constructor(usersRepository, userTokensRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new _AppError.default('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new _AppError.default('User does not exists');
    } // Verificando se o usuário está tentando resetar a senha utilizando um token gerado com validade dentro do período de 2 horas.


    const tokenCreatedAt = userToken.created_at;
    const compareDate = (0, _dateFns.addHours)(tokenCreatedAt, 2);

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }

}

var _default = ResetPasswordService;
exports.default = _default;