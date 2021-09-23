"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SearchUserByEmailService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(email) {
    const user = await this.usersRepository.findByEmail(email.toLowerCase());
    return user;
  }

}

var _default = SearchUserByEmailService;
exports.default = _default;