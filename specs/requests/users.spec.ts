/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { describe, before, it } from 'mocha';
import { expect } from 'chai';

import sequelize from '../../src/sequelize';
import shouldBehaveLikeAnAPI, { request } from './shared';
import User from '../../src/models/User';
import factory from '../utilities/factories';
import { Role } from '../../src/utils/roles';

describe('[Request] Users', () => {
  let user: User | undefined;

  before(async function () {
    await sequelize.sync({ force: true }); // clear database

    user = await factory.create<User>('User');

    this.updateId = user.id;
    this.path = '/users';
  });

  describe('index', function () {
    it('should return a 403 status', function (done) {
      request.get(this.path).set('Authorization', `Bearer ${user?.providerId}`).expect(403, done);
    });

    describe('as an admin', function () {
      let admin: User | undefined;
      before(async function () {
        admin = await factory.create<User>('User', { role: Role.Admin });
      });

      it('should return a 200 status', function (done) {
        request.get(this.path).set('Authorization', `Bearer ${admin?.providerId}`).expect(200, done);
      });
    });
  });

  describe('me', function () {
    it('should return a 200 status', function (done) {
      request.get(`${this.path}/me`).set('Authorization', `Bearer ${user?.providerId}`).expect(200, done);
    });

    it('should return the user', function (done) {
      request
        .get(`${this.path}/me`)
        .set('Authorization', `Bearer ${user?.providerId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.data.user.id).to.equal(user?.id);
          expect(res.body.data.user.email).to.equal(user?.email);
          expect(res.body.data.user.name).to.equal(user?.name);
          expect(res.body.data.user.createdAt).to.equal(user?.createdAt.toISOString());
          return done();
        });
    });
  });

  const actionsToTest = ['show'];
  shouldBehaveLikeAnAPI(actionsToTest);
});
