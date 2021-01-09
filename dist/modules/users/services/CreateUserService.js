"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateUserService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute(data) {
    const {
      profile_id,
      name,
      city,
      city_state,
      country,
      company,
      email,
      telephone,
      password
    } = data;
    const checkUserExists = await this.usersRepository.findByEmail(data.email);

    if (checkUserExists) {
      throw new _AppError.default('Email address already used');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      profile_id,
      name,
      city,
      city_state,
      country,
      company,
      email,
      telephone,
      password: passwordHashed
    });
    return user;
  }

}

var _default = CreateUserService;
exports.default = _default;