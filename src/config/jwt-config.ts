import * as dotenv from 'dotenv-flow';

dotenv.config({ silent: true });

export default {
  secret: process.env.JWT_SECRET || 'testing',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
