"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _HistoryRequest = _interopRequireDefault(require("../entities/HistoryRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HistoryRequestsRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_HistoryRequest.default);
  }

  async create(data) {
    const created = this.ormRepository.create(data);
    await this.ormRepository.save(created);
    return created;
  }

  async listByRequestId(request_id) {
    const histories = await this.ormRepository.find({
      where: {
        request_id
      },
      relations: ['user']
    });
    return histories;
  }

}

var _default = HistoryRequestsRepository;
exports.default = _default;