"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SearchUserByNameService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(name, profile_id, page, perpage) {
    const users = await this.usersRepository.searchByName(name, profile_id, page, perpage);
    return users;
  }

}

var _default = SearchUserByNameService;
exports.default = _default;