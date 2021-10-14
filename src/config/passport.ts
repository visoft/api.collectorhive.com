import { Application } from 'express';
import passport from 'passport';

import localStrategy from './strategy/local.strategy';

localStrategy();

const passportConfig = (app: Application) => {
  app.use(passport.initialize());
};

export default passportConfig;
