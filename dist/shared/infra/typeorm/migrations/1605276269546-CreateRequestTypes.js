"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateRequestTypes1605276269546 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'request_types',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true
      }, {
        name: 'name',
        type: 'varchar'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('request_types');
  }

}

exports.default = CreateRequestTypes1605276269546;