import express from 'express';
import { Model } from 'sequelize-typescript';
import BaseController from './controllers/base.controller';
import UsersController from './controllers/users.controller';

const router = express.Router();

const restfulRoutes = (routePrefix: string, idParam: string, controller: BaseController<Model>) => {
  router.get(`/${routePrefix}`, controller.index);
  router.get(`/${routePrefix}/:${idParam}`, controller.show);
};

restfulRoutes('users', 'userId', new UsersController());

export default router;
