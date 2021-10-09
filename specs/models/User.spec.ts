import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import User from '../../src/models/User';
import sequelize from '../../src/sequelize';

describe('User Model', () => {
  before(async () => {
    // runs once before the first test in this block
    await sequelize.sync({ force: true });
  });

  it('should be defined', () => {
    expect(new User()).to.not.be.undefined;
  });

  describe('validations', () => {
    it('should be invalid by default', async () => {
      const user = new User();
      try {
        await user.validate();
      } catch (err) {
        expect(err).to.not.be.undefined;
      }
    });

    it('should be invalid without a name', async () => {
      const user = new User();
      user.name = '';
      user.email = 'john@doe.com';
      user.password = '123456';
      user.provider = 'local';
      try {
        await user.validate();
      } catch (err: any) {
        expect(err.errors[0].message).to.equal('User.name cannot be null');
      }
    });

    it('should be invalid without an email', async () => {
      const user = new User();
      user.name = 'John Doe';
      user.password = '123456';
      user.provider = 'local';
      try {
        await user.validate();
      } catch (err: any) {
        expect(err.errors[0].message).to.equal('User.email cannot be null');
      }
    });

    it('should be invalid with an invalid email', async () => {
      const user = new User();
      user.name = 'John Doe';
      user.email = 'john@';
      user.password = '123456';
      user.provider = 'local';
      try {
        await user.validate();
      } catch (err: any) {
        expect(err.errors[0].message).to.equal('Validation isEmail on email failed');
      }
    });

    it('should be invalid without a password', async () => {
      const user = new User();
      user.name = 'John Doe';
      user.email = 'john@doe.com';
      user.password = '';
      user.provider = 'local';
      try {
        await user.validate();
      } catch (err: any) {
        expect(err.errors[0].message).to.equal('User.password cannot be null');
      }
    });

    it('should be invalid without a provider', async () => {
      const user = new User();
      user.name = 'John Doe';
      user.email = 'john@doe.com';
      user.password = '123456';
      user.provider = '';
      try {
        await user.validate();
      } catch (err: any) {
        expect(err.errors[0].message).to.equal('User.provider cannot be null');
      }
    });
  });

  describe('creation', () => {
    it('should be able to be created', async () => {
      const user = new User();
      user.name = 'John Doe';
      user.email = 'john@doe.com';
      user.password = '123456';
      user.provider = 'local';
      try {
        const savedUser = await user.save();
        expect(savedUser.id).to.not.be.null;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });

    it('should be set an encrypted password', async () => {
      const user = new User();
      user.name = 'John Doe';
      user.email = 'john@doe.com';
      user.password = '123456';
      user.provider = 'local';
      try {
        const savedUser = await user.save();
        expect(savedUser.password).to.not.equal('123456');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });

    it('should be set a providerId for local', async () => {
      const user = new User();
      user.name = 'John Doe';
      user.email = 'john@doe.com';
      user.password = '123456';
      user.provider = 'local';
      try {
        const savedUser = await user.save();
        expect(savedUser.provider).to.not.be.undefined;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    });
  });
});