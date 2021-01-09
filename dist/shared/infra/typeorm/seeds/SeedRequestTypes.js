"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestType = _interopRequireDefault(require("../../../../modules/requests/infra/typeorm/entities/RequestType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SeedRequestTypes {
  async run(factory, connection) {
    await connection.createQueryBuilder().insert().into(_RequestType.default).values([{
      name: 'venda'
    }, {
      name: 'qualidade'
    }, {
      name: 'orçamento'
    }, {
      name: 'técnico'
    }, {
      name: 'finalizar'
    }]).execute();
  }

}

exports.default = SeedRequestTypes;