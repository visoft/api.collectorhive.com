/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { describe, it, before } from 'mocha';
import supertest from 'supertest';
import app from '../../src/app';
import User from '../../src/models/User';
import factory from '../utilities/factories';

export const request = supertest(app);
const defaultTestActions = ['index', 'show'];

const shouldBehaveLikeAnAPI = function (actionsToTest = defaultTestActions) {
  let admin: User | null;

  before(async function () {
    admin = await factory.create<User>('User');
  });

  if (actionsToTest.includes('index')) {
    describe('index', function () {
      describe('does exist', function () {
        it('should return a 200 status', function (done) {
          request.get(this.path).set('Authorization', `Bearer ${admin?.providerId}`).expect(200, done);
        });
      });
    });
  }

  if (actionsToTest.includes('show')) {
    describe('show', function () {
      describe('does not exist', function () {
        it('should return a 404 error', function (done) {
          request.get(`${this.path}/1234567`).set('Authorization', `Bearer ${admin?.providerId}`).expect(404, done);
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
  }

  if (actionsToTest.includes('create')) {
    describe('create', function () {
      it('should return a 201 status', function (done) {
        request
          .post(this.path)
          .send(this.createData)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${admin?.providerId}`)
          .expect(201, done);
      });
    });
  }
};

export default shouldBehaveLikeAnAPI;
