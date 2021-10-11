import User from '../models/User';
import BaseController from './base.controller';

export default class UsersController extends BaseController<User> {
  constructor() {
    const attributes = ['email', 'password', 'name', 'providerId', 'provider', 'createdAt', 'updatedAt'];
    super(User, 'users', attributes, 'userId');
  }
}
