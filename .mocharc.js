process.env.NODE_ENV = 'test';

module.exports = {
  require: 'ts-node/register',
  extension: ['ts'],
  watchExtensions: ['ts'],
  spec: ['specs/**/*.spec.ts'],
};
