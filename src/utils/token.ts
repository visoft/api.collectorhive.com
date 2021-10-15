import jwt from 'jsonwebtoken';

import config from '../config/jwt-config';

// Generate a token
// @param {string} email - user's email
export default (email: string): string => {
  const token = jwt.sign({ id: email }, config.secret, {
    expiresIn: config.expiresIn,
  });
  return token;
};
