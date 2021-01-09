"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _FollowUpRequest = _interopRequireDefault(require("../entities/FollowUpRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FollowUpRequestsRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_FollowUpRequest.default);
  }

  async create(data) {
    const created = this.ormRepository.create(data);
    await this.ormRepository.save(created);
    return created;
  }

  async save(data) {
    const upatted = await this.ormRepository.save(data);
    return upatted;
  }

  async findByRequestId(id) {
    const followUp = await this.ormRepository.findOne({
      where: {
        request_id: id
      },
      relations: ['request', 'request_status', 'request.user', 'request.contact_type']
    });
    return followUp;
  }

  async listByRequestId(id) {
    const followUp = await this.ormRepository.find({
      where: {
        request_id: id
      }
    });
    return followUp;
  }

  async findByRequestAndRequestType(request_id, request_type_id) {
    const followUp = await this.ormRepository.findOne({
      where: {
        request_id,
        request_type_id
      }
    });
    return followUp;
  }

  async showByRequestAndRequestType(request_id, request_type_id) {
    const followUp = await this.ormRepository.findOne({
      where: {
        request_id,
        request_type_id
      },
      relations: ['request', 'request_status', 'request.user', 'request.contact_type']
    });
    return followUp;
  }

  async search(request_type_id, request_status_id, name, page, perPage) {
    const skipPage = (page - 1) * perPage;
    const followups = await this.ormRepository.query(`
    SELECT
      f.id,
      f.request_id,
      f.request_type_id,
      f.request_status_id,
      f.user_id,
      f.created_at,
      f.updated_at,
      r.user_id,
      u."name" as user_name
    FROM public.followup_requests as f
    inner join requests r on (r.id = f.request_id)
    inner join users u on (u.id = r.user_id)
    where u."name" ilike '%${name}%'
    and f.request_status_id = ${request_status_id}
    and f.request_type_id  = ${request_type_id}
    LIMIT ${perPage}
    OFFSET ${skipPage};
    `);
    return followups;
  }

}

var _default = FollowUpRequestsRepository;
exports.default = _default;