import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

export enum Role {
  Admin = 'admin',
  User = 'user',
}
