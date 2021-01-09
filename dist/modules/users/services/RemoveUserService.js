"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RemoveUserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    userIdRemove,
    userIdLogged
  }) {
    const userRemove = await this.usersRepository.findById(userIdRemove);

    if (!userRemove) {
      throw new _AppError.default('User not exists');
    } // const userLogged = await this.usersRepository.findById(userIdLogged);
    // if (!userLogged) {
    //   throw new AppError('User not exists');
    // }
    // if (
    //   userRemove.id !== userLogged.id &&
    //   userLogged.profile.name !== 'gestão'
    // ) {
    //   throw new AppError('you are not allowed to remove user');
    // }


    await this.usersRepository.remove(userRemove);
  }

}

var _default = RemoveUserService;
exports.default = _default;