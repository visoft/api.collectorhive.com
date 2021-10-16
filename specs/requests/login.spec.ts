import { describe, before, it } from 'mocha';
import supertest from 'supertest';
import { expect } from 'chai';

import app from '../../src/app';
import factory from '../utilities/factories';
import User from '../../src/models/User';
import sequelize from '../../src/sequelize';

const request = supertest(app);

describe('[Request] Login', async () => {
  before(async () => {
    await sequelize.sync({ force: true }); // clear database
  });

  describe('with existing user', () => {
    let user: User | undefined;

    before(async () => {
      user = (await factory.create('User', { password: 'password' })) as User;
    });

    describe('with valid credentials', () => {
      it('should return a 200 status', (done) => {
        request
          .post('/login')
          .send({
            username: user?.email,
            password: 'password',
          })
          .expect(200, done);
      });

      it('should return a JWT', (done) => {
        request
          .post('/login')
          .send({
            username: user?.email,
            password: 'password',
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.data.bearerToken).to.not.be.undefined;
            return done();
          });
      });
    });

    describe('with invalid credentials', () => {
      it('should return a 401 status', (done) => {
        request
          .post('/login')
          .send({
            username: user?.email,
            password: 'password1',
          })
          .expect(401, done);
      });
    });
  });

  describe('non-existing user', () => {
    it('should return a 401 status', (done) => {
      request
        .post('/login')
        .send({
          username: 'john@doe.com',
          password: 'password',
        })
        .expect(401, done);
    });
  });
});
