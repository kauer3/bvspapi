"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTypeContactCreate1605268688628 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'contact_types',
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
    await queryRunner.dropTable('contact_types');
  }

}

exports.default = CreateTypeContactCreate1605268688628;