"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ContactType = _interopRequireDefault(require("../../../../modules/requests/infra/typeorm/entities/ContactType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SeedContactTypes {
  async run(factory, connection) {
    await connection.createQueryBuilder().insert().into(_ContactType.default).values([{
      name: 'e-mail'
    }, {
      name: 'ligação'
    }, {
      name: 'whatsapp'
    }]).execute();
  }

}

exports.default = SeedContactTypes;