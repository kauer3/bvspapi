"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateRequestStatus1605275752024 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'request_status',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'type',
        type: 'varchar'
      }, {
        name: 'sequency',
        type: 'int'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('request_status');
  }

}

exports.default = CreateRequestStatus1605275752024;