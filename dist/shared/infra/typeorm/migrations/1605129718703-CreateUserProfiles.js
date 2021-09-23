"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUserProfiles1605129718703 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user_profiles',
      columns: [{
        name: 'id',
        type: 'int',
        isGenerated: true,
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('user_profiles');
  }

}

exports.default = CreateUserProfiles1605129718703;