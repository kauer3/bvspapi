"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AlertRequest = _interopRequireDefault(require("../entities/AlertRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AlertsRequestsRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_AlertRequest.default);
  }

  async create(data) {
    const created = this.ormRepository.create(data);
    await this.ormRepository.save(created);
    return created;
  }

  async findByRequestId(id) {
    const alert = await this.ormRepository.findOne({
      where: {
        request_id: id
      }
    });
    return alert;
  }

  async countTodayByProfile(request_type_id, date) {
    const filterByRequest = request_type_id === 5 ? '' : `and f.request_type_id = ${request_type_id} `;
    const alertCount = await this.ormRepository.query(`
    SELECT
      count(f.id)
    FROM followup_requests as f
    inner join requests r on (r.id = f.request_id)
    inner join users u on (u.id = r.user_id)
    inner join alert_requests ar on (ar.request_id = f.request_id)
    where f.request_status_id <> 3
    ${filterByRequest}
    and ar.moment < '${date}';
    `);
    return alertCount;
  }

  async listAlertsTodayByRequestType(data) {
    const {
      request_type_id,
      date,
      page,
      perPage
    } = data;
    const skipPage = (page - 1) * perPage;
    const filterByRequest = request_type_id === 5 ? '' : `and f.request_type_id = ${request_type_id} `;
    const alerts = await this.ormRepository.query(`
    SELECT
      f.id,
      f.request_id,
      f.request_type_id,
      f.request_status_id,
      f.user_id as user_name,
      r.user_id as client_id,
      u."name" as client_name,
      ar.moment,
      f.created_at,
      f.updated_at
    FROM followup_requests as f
    inner join requests r on (r.id = f.request_id)
    inner join users u on (u.id = r.user_id)
    inner join alert_requests ar on (ar.request_id = f.request_id)
    where f.request_status_id <> 3
    ${filterByRequest}
    and ar.moment < '${date}'
    LIMIT ${perPage}
    OFFSET ${skipPage};
    `);
    return alerts;
  }

  async save(data) {
    const alert = await this.ormRepository.save(data);
    return alert;
  }

}

var _default = AlertsRequestsRepository;
exports.default = _default;