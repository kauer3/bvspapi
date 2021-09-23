"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestStatus = _interopRequireDefault(require("../../../../modules/requests/infra/typeorm/entities/RequestStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SeedRequestStatus {
  async run(factory, connection) {
    await connection.createQueryBuilder().insert().into(_RequestStatus.default).values([{
      name: 'em aberto',
      type: 'request',
      sequency: 1
    }, {
      name: 'em andamento',
      type: 'request',
      sequency: 2
    }, {
      name: 'concluído',
      type: 'request',
      sequency: 3
    }]).execute();
  }

}

exports.default = SeedRequestStatus;