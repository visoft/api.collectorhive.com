/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { describe, it, before } from 'mocha';
import supertest from 'supertest';
import app from '../../src/app';
import User from '../../src/models/User';
import factory from '../utilities/factories';

const request = supertest(app);

const shouldBehaveLikeAnAPI = function () {
  before(async function () {
    if (!this.user) {
      const u = (await factory.create('User')) as User;
      this.userId = u.id;
      this.token = u.providerId;
    } else {
      this.token = this.user.providerId;
    }
  });

  describe('index', function () {
    describe('does exist', function () {
      it('should return a 200 status', function (done) {
        request.get(this.path).expect(200, done);
      });
    });
  });

  describe('show', function () {
    describe('does not exist', function () {
      it('should return a 404 error', function (done) {
        request.get(`${this.path}/fakeuuid`).expect(404, done);
      });
    });

    describe('does exist', function () {
      it('should return a 200 status', function (done) {
        request.get(`${this.path}/${this.userId}`).expect(200, done);
      });
    });
  });
};

export default shouldBehaveLikeAnAPI;
