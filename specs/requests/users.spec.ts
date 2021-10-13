/* eslint-disable func-names */
import { describe, before } from 'mocha';
import sequelize from '../../src/sequelize';
import shouldBehaveLikeAnAPI from './shared';

describe('[Request] Users', async () => {
  before(async function () {
    await sequelize.sync({ force: true }); // clear database
    this.path = '/users';
  });

  shouldBehaveLikeAnAPI();
});
