/* eslint-disable func-names */
import { describe, before } from 'mocha';

import sequelize from '../../src/sequelize';
import shouldBehaveLikeAnAPI from './shared';
import User from '../../src/models/User';
import factory from '../utilities/factories';

describe('[Request] Users', () => {
  before(async function () {
    await sequelize.sync({ force: true }); // clear database

    const u = await factory.create<User>('User');

    this.updateId = u.id;
    this.path = '/users';
  });

  shouldBehaveLikeAnAPI();
});
