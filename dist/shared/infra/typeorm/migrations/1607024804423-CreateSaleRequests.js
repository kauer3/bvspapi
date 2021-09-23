"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateSaleRequests1607024804423 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'sale_requests',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'request_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'description',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('sale_requests', new _typeorm.TableForeignKey({
      columnNames: ['request_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'requests',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('sale_requests');
  }

}

exports.default = CreateSaleRequests1607024804423;