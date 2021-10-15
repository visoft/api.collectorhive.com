/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { describe, it, before } from 'mocha';
import supertest from 'supertest';
import app from '../../src/app';
import User from '../../src/models/User';
import factory from '../utilities/factories';

const request = supertest(app);

const shouldBehaveLikeAnAPI = function () {
  let admin: User | null;

  describe('API', function () {
    before(async function () {
      admin = await factory.create<User>('User');
    });

    describe('index', function () {
      describe('does exist', function () {
        it('should return a 200 status', function (done) {
          request.get(this.path).set('Authorization', `Bearer ${admin?.providerId}`).expect(200, done);
        });
      });
    });

    describe('show', function () {
      describe('does not exist', function () {
        it('should return a 404 error', function (done) {
          request.get(`${this.path}/fake`).set('Authorization', `Bearer ${admin?.providerId}`).expect(404, done);
        });
      });

      describe('does exist', function () {
        it('should return a 200 status', function (done) {
          request
            .get(`${this.path}/${this.updateId}`)
            .set('Authorization', `Bearer ${admin?.providerId}`)
            .expect(200, done);
        });
      });
    });
  });
};

export default shouldBehaveLikeAnAPI;
