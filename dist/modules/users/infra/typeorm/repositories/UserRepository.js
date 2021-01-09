"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UsersRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async showById(id) {
    const user = await this.ormRepository.findOne(id, {
      relations: ['profile']
    });
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      },
      relations: ['profile']
    });
    return user;
  }

  async searchByName(name = '', profile_id, page, perPage) {
    const users = await this.ormRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      relations: ['profile'],
      where: {
        name: (0, _typeorm.Raw)(alias => `${alias} ILIKE '%${name}%'`),
        profile_id
      },
      order: {
        name: 'ASC'
      }
    });
    return users;
  }

  async create(userData) {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

  async remove(user) {
    this.ormRepository.remove(user);
  }

}

var _default = UsersRepository;
exports.default = _default;