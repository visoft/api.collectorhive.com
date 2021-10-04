'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.createTable('Users', {
    id: { type: 'uuid', primaryKey: true, defaultValue: new String('gen_random_uuid()') },
    email: { type: 'string', length: 255, notNull: true },
    name: { type: 'string', length: 255, notNull: true },
    password: { type: 'string', length: 255, notNull: true },
    provider: { type: 'string', length: 255, notNull: true },
    providerId: { type: 'string', length: 255, notNull: true },
    created_at: { type: 'datetime', notNull: true },
    updated_at: { type: 'datetime', notNull: true },
  });
  return null;
};

exports.down = function (db) {
  db.dropTable('Users');
  return null;
};

exports._meta = {
  version: 1,
};
