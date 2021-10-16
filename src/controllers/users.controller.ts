import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

import tokenUtil from '../utils/token';
import User from '../models/User';
import BaseController from './base.controller';

export default class UsersController extends BaseController<User> {
  constructor() {
    const publicAttributes = ['id', 'name', 'email', 'createdAt'];
    const attributes = ['id', 'email', 'password', 'name', 'providerId', 'provider', 'createdAt', 'updatedAt'];
    const actions = ['show'];
    super(User, 'users', attributes, 'userId', { attributes: publicAttributes }, actions);
  }

  static async me(req: Request, res: Response) {
    const { email } = req?.user as User;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'User not found' });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
      },
    });
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', { session: false }, (error: any, user: User, info: any) => {
      if (error) {
        return res.status(500).json({ status: 'error', error });
      }

      if (info !== undefined) {
        return res.status(401).json({ status: 'error', error: info.message });
      }

      return req.logIn(user, { session: false }, async (err) => {
        if (err) {
          return res.status(500).json({ status: 'error', error: 'Unspecified Error' });
        }

        const token = tokenUtil(user.email);
        user.providerId = token; // eslint-disable-line no-param-reassign
        await user.save();

        return res.status(200).json({
          status: 'success',
          data: {
            user: { id: user.id, name: user.name, email: user.email },
            bearerToken: token,
            tokenType: 'JWT',
          },
        });
      });
    })(req, res, next);
  }
}
