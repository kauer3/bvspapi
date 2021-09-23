"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateRequests1605277276468 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'requests',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'request_status_id',
        type: 'int',
        default: 2 // processing

      }, {
        name: 'contact_type_id',
        type: 'int',
        isNullable: true
      }, {
        name: 'client_description',
        type: 'varchar'
      }, {
        name: 'attendant_description',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'contact',
        type: 'varchar'
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
    await queryRunner.createForeignKey('requests', new _typeorm.TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('requests', new _typeorm.TableForeignKey({
      columnNames: ['request_status_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'request_status',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('requests', new _typeorm.TableForeignKey({
      columnNames: ['contact_type_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'contact_types',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('requests');
  }

}

exports.default = CreateRequests1605277276468;