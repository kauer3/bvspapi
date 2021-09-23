"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Request = _interopRequireDefault(require("../entities/Request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RequestRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_Request.default);
  }

  async findById(id) {
    const request = await this.ormRepository.findOne(id);
    return request;
  }

  async showById(id) {
    const request = await this.ormRepository.findOne(id, {
      relations: ['user', 'request_status', 'contact_type']
    });
    return request;
  }

  async listAll() {
    const request = await this.ormRepository.find({
      relations: ['user', 'request_status', 'contact_type']
    });
    return request;
  }

  async listByUserId(userId, page, perPage) {
    const request = await this.ormRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      where: {
        user_id: userId
      },
      order: {
        created_at: 'DESC'
      },
      relations: ['user', 'request_status', 'contact_type']
    });
    return request;
  }

  async findByDateBetween(from, to) {
    const requests = await this.ormRepository.find({
      where: {
        created_at: (0, _typeorm.Between)(from, to)
      },
      order: {
        created_at: 'DESC'
      }
    });
    return requests;
  }

  async search(name, requestStatusId, page, perPage) {
    const request = await this.ormRepository.find({
      join: {
        alias: 'requests',
        innerJoin: {
          user: 'requests.user'
        }
      },
      where: query => {
        query.where({
          request_status_id: requestStatusId
        }).andWhere('user.name ILIKE :userName', {
          userName: `%${name}%`
        });
      },
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        created_at: 'ASC'
      },
      relations: ['user', 'request_status', 'contact_type']
    });
    return request;
  }

  async create(data) {
    const request = this.ormRepository.create(data);
    await this.ormRepository.save(request);
    return request;
  }

  async save(request) {
    return this.ormRepository.save(request);
  }

}

var _default = RequestRepository;
exports.default = _default;