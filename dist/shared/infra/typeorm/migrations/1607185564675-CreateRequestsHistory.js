"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateRequestsHistory1607185564675 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'history_requests',
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
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('history_requests', new _typeorm.TableForeignKey({
      columnNames: ['request_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'requests',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('history_requests', new _typeorm.TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('history_requests');
  }

}

exports.default = CreateRequestsHistory1607185564675;