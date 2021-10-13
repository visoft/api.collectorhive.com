import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import jwtSecret from '../config/jwt-config';
import User from '../models/User';
import BaseController from './base.controller';

export default class UsersController extends BaseController<User> {
  constructor() {
    const attributes = ['email', 'password', 'name', 'providerId', 'provider', 'createdAt', 'updatedAt'];
    super(User, 'users', attributes, 'userId');
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', { session: false }, (error: any, user: User, info: any) => {
      if (error) {
        res.status(500).json({ status: 'error', error });
        return next(error);
      }

      if (info !== undefined) {
        res.status(401).json({ status: 'error', error: info.message });
        return next(info);
      }

      return req.logIn(user, { session: false }, async (err) => {
        if (err) {
          res.status(500).json({ status: 'error', error: 'Unspecified Error' });
          return next(err);
        }

        const token = jwt.sign({ id: user.email }, jwtSecret.secret);
        user.providerId = token; // eslint-disable-line no-param-reassign
        await user.save();

        return res.status(200).json({
          status: 'success',
          data: {
            user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
            access_token: token,
            token_type: 'jwt',
          },
        });
      });
    })(req, res, next);
  }
}
