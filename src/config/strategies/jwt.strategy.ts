import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';

import User from '../../models/User';
import jwtConfig from '../jwt-config';

interface IJwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export default () => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret,
  };

  passport.use(
    'jwt',
    new JwtStrategy(opts, async (jwtPayload: IJwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { email: jwtPayload.id } });

        if (user) {
          return done(null, user);
        }
        return done(null, false, { status: 'error', error: 'Unauthorized' });
      } catch (e) {
        return done(e);
      }
    }),
  );
};
