"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    userIdForShow,
    userIdLogged
  }) {
    const userForShow = await this.usersRepository.showById(userIdForShow);

    if (!userForShow) {
      throw new _AppError.default('user not exists');
    }

    const userLogged = await this.usersRepository.showById(userIdLogged);

    if (!userLogged) {
      throw new _AppError.default('you need to be authenticated');
    }

    if (userForShow.id !== userLogged.id && userLogged.profile.name !== 'gestão') {
      throw new _AppError.default('you are not allowed to remove user');
    }

    return userForShow;
  }

}

var _default = ShowUserService;
exports.default = _default;