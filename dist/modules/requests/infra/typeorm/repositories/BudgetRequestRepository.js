"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _BudgetRequest = _interopRequireDefault(require("../entities/BudgetRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BudgetRequestRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_BudgetRequest.default);
  }

  async create(data) {
    const created = this.ormRepository.create(data);
    await this.ormRepository.save(created);
    return created;
  }

  async save(data) {
    const updatted = this.ormRepository.save(data);
    return updatted;
  }

  async findById(id) {
    const budget = await this.ormRepository.findOne(id);
    return budget;
  }

  async findByRequestId(id) {
    const request = await this.ormRepository.findOne({
      where: {
        request_id: id
      },
      relations: ['request', 'request.user', 'request.contact_type']
    });
    return request;
  }

  async search(request_status_id, name, page, perPage) {
    const budget = await this.ormRepository.find({
      join: {
        alias: 'requests',
        innerJoin: {
          user: 'requests.user'
        }
      },
      where: query => {
        query.where({
          request_status_id
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
    return budget;
  }

}

var _default = BudgetRequestRepository;
exports.default = _default;