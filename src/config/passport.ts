import { Application } from 'express';
import passport from 'passport';

import localStrategy from './strategies/local.strategy';
import jwtStrategy from './strategies/jwt.strategy';

localStrategy();
jwtStrategy();

const passportConfig = (app: Application) => {
  app.use(passport.initialize());
};

export default passportConfig;
