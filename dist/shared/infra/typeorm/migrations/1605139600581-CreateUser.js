"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUser1605139600581 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'profile_id',
        type: 'int',
        isNullable: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'company',
        type: 'varchar'
      }, {
        name: 'city',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'city_state',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'country',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'telephone',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'password',
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
    await queryRunner.createForeignKey('users', new _typeorm.TableForeignKey({
      columnNames: ['profile_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user_profiles',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.default = CreateUser1605139600581;