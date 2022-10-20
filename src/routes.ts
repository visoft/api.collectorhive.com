import express from 'express';
import passport from 'passport';
import { Model } from 'sequelize-typescript';

import BaseController from './controllers/base.controller';
import UsersController from './controllers/users.controller';

const router = express.Router();

const restfulRoutes = (routePrefix: string, idParam: string, controller: BaseController<Model>) => {
  const cons = controller.constructor as typeof BaseController;

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
  router.post(
    `/${routePrefix}`,
    [passport.authenticate('jwt', { session: false, failWithError: true }), cons.validateCreate()],
    controller.create,
  );
};

// Unauthenticated user routes
router.post('/login', express.urlencoded({ extended: false }), UsersController.login);
router.post('/users/new', UsersController.validateNewCreate(), UsersController.new);
router.post('/forgot-password', express.json(), UsersController.forgotPassword);

// Authenticated user routes
router.get('/users/me', passport.authenticate('jwt', { session: false, failWithError: true }), UsersController.me);
restfulRoutes('users', 'userId', new UsersController());

export default router;
