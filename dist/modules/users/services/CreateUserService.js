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
      name,
      city,
      company,
      country,
      email,
      password
    } = data;
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new _AppError.default('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      name_insensitive: name.toLocaleLowerCase().trim(),
      city,
      company,
      country,
      email: email.toLocaleLowerCase().trim(),
      accesscode: hashedPassword
    });
    return user;
  }

}

var _default = CreateUserService;
exports.default = _default;