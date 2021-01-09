"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateUserService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute(data) {
    const userData = await this.usersRepository.findById(data.id);

    if (!userData) {
      throw new _AppError.default('userData not found', 404);
    } // If user request password update.


    if (data.password) {
      const hashedPassword = await this.hashProvider.generateHash(data.password);
      userData.password = hashedPassword;
    } // If user change telephone because when register is opcional.


    if (data.telephone) {
      userData.telephone = data.telephone;
    }

    userData.profile_id = data.profile_id;
    userData.name = data.name;
    userData.city = data.city;
    userData.city_state = data.city_state;
    userData.country = data.country;
    userData.company = data.company;
    const userUpdatted = await this.usersRepository.save(userData);
    return userUpdatted;
  }

}

var _default = UpdateUserService;
exports.default = _default;