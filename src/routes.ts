import express from 'express';
import passport from 'passport';
import { Model } from 'sequelize-typescript';

import BaseController from './controllers/base.controller';
import UsersController from './controllers/users.controller';

const router = express.Router();

const restfulRoutes = (routePrefix: string, idParam: string, controller: BaseController<Model>) => {
  router.get(
    `/${routePrefix}`,
    passport.authenticate('jwt', { session: false, failWithError: true }),
    controller.index,
  );
  router.get(
    `/${routePrefix}/:${idParam}`,
    passport.authenticate('jwt', { session: false, failWithError: true }),
    controller.show,
  );
};

router.post('/login', express.urlencoded({ extended: false }), UsersController.login);
router.get('/users/me', passport.authenticate('jwt', { session: false, failWithError: true }), UsersController.me);

restfulRoutes('users', 'userId', new UsersController());

export default router;
