"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAlertsRequests1607181711983 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'alert_requests',
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
        name: 'moment',
        type: 'timestamp'
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
    await queryRunner.createForeignKey('alert_requests', new _typeorm.TableForeignKey({
      columnNames: ['request_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'requests',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('alert_requests', new _typeorm.TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('alert_requests');
  }

}

exports.default = CreateAlertsRequests1607181711983;