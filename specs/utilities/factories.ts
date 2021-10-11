import factory from 'factory-bot';
import User from '../../src/models/User';

// try to build a user, if if fails, create a new factory
factory.build('User').catch(() => {
  factory.define('User', User, {
    email: factory.seq('User.email', (n) => `user${n}@foo.com`),
    name: 'Foo',
    password: 'Bar',
    provider: 'local',
  });
});

export default factory;
