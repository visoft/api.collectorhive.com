import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../../models/User';

export default () => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        session: false,
      },
      async (email: string, password: string, done: any) => {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        try {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect username or password.' });
          }
          return done(null, user);
        } catch (err: any) {
          return done(err);
        }
      },
    ),
  );
};
