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

    this.createData = JSON.stringify({
      email: 'foo@bar.com',
      name: 'Foo',
      password: 'Bar',
      provider: 'local',
    });
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

  describe('new', function () {
    describe('with valid data', function () {
      it('should return a 200 status', function (done) {
        request
          .post(`${this.path}/new`)
          .send({
            email: 'foo1@gmail.com',
            password: 'password',
            name: 'Foo',
          })
          .expect(200, done);
      });

      it('should return the new user', function (done) {
        request
          .post(`${this.path}/new`)
          .send({
            email: 'foo2@gmail.com',
            password: 'password',
            name: 'Foo',
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.data.user.id).to.not.be.null;
            expect(res.body.data.user.email).to.equal('foo2@gmail.com');
            expect(res.body.data.user.name).to.equal('Foo');
            expect(res.body.data.user.createdAt).to.not.be.null;
            expect(res.body.data.user.updatedAt).to.not.be.null;
            expect(res.body.data.user.providerId).to.not.be.null;
            return done();
          });
      });
    });

    describe('with invalid data', function () {
      it('should return a 422 status', function (done) {
        request
          .post(`${this.path}/new`)
          .send({
            email: 'foo',
            password: 'password',
            name: 'Foo',
          })
          .expect(422, done);
      });

      it('should return the error for invalid email', function (done) {
        request
          .post(`${this.path}/new`)
          .send({
            email: 'foo',
            password: 'password',
            name: 'Foo',
          })
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);

            expect(res.body.status).to.eq('error');
            const error = res.body.errors[0];
            expect(error.param).to.eq('email');
            expect(error.msg).to.equal('Invalid value');
            return done();
          });
      });

      it('should return the error for missing password', function (done) {
        request
          .post(`${this.path}/new`)
          .send({
            email: 'bar@gmail.com',
            password: '',
            name: 'Bar',
          })
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);

            expect(res.body.status).to.eq('error');
            const error = res.body.errors[0];
            expect(error.param).to.eq('password');
            expect(error.msg).to.equal('Invalid value');
            return done();
          });
      });

      it('should return the error for missing name', function (done) {
        request
          .post(`${this.path}/new`)
          .send({
            email: 'bar1@gmail.com',
            password: 'password',
            name: '',
          })
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);

            expect(res.body.status).to.eq('error');
            const error = res.body.errors[0];
            expect(error.param).to.eq('name');
            expect(error.msg).to.equal('Invalid value');
            return done();
          });
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

  const actionsToTest = ['show', 'create'];
  shouldBehaveLikeAnAPI(actionsToTest);
});
