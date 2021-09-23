"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateFollowUpRequests1607195106904 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'followup_requests',
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
        name: 'request_type_id',
        type: 'int',
        isNullable: true
      }, {
        name: 'request_status_id',
        type: 'int',
        default: 2 // processing

      }, {
        name: 'user_id',
        type: 'uuid',
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
    await queryRunner.createForeignKey('followup_requests', new _typeorm.TableForeignKey({
      columnNames: ['request_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'requests',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('followup_requests', new _typeorm.TableForeignKey({
      columnNames: ['request_status_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'request_status',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('followup_requests', new _typeorm.TableForeignKey({
      columnNames: ['request_type_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'request_types',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('followup_requests', new _typeorm.TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('followup_requests');
  }

}

exports.default = CreateFollowUpRequests1607195106904;