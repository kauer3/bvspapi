"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserProfile = _interopRequireDefault(require("../../../../modules/users/infra/typeorm/entities/UserProfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SeedUserProfiles {
  async run(factory, connection) {
    await connection.createQueryBuilder().insert().into(_UserProfile.default).values([{
      name: 'venda'
    }, {
      name: 'orçamento'
    }, {
      name: 'engenharia'
    }, {
      name: 'gestão'
    }, {
      name: 'cliente'
    }, {
      name: 'qualidade'
    }, {
      name: 'técnico'
    }]).execute();
  }

}

exports.default = SeedUserProfiles;