"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _SaleRequest = _interopRequireDefault(require("../entities/SaleRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SaleRequestRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_SaleRequest.default);
  }

  async create(data) {
    const created = this.ormRepository.create({ ...data,
      description: ' '
    });
    await this.ormRepository.save(created);
    return created;
  }

  async save(data) {
    const updatted = await this.ormRepository.save(data);
    return updatted;
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

}

var _default = SaleRequestRepository;
exports.default = _default;