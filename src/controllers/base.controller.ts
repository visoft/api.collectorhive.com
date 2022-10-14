import { Model } from 'sequelize-typescript';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import logger from '../utils/logger';

// Type `ModelType` would basically wrap & satisfy the 'this' context of any sequelize helper methods
// eslint-disable-next-line no-unused-vars
type Constructor<T> = new (...args: any[]) => T;
type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;

const errorFormatter = ({ msg, param }: { msg: string; param: string }) => ({
  param,
  msg,
});

export default abstract class BaseController<T extends Model<T>> {
  model: ModelType<T>;

  collectionName: string;

  attributesArray: string[];

  paramName: string;

  queryOptions: any;

  constructor(
    model: ModelType<T>,
    collectionName: string,
    attributesArray: string[],
    paramName: string,
    queryOptions: any = {},
  ) {
    this.model = model;
    this.collectionName = collectionName;
    this.attributesArray = attributesArray;
    this.paramName = paramName;
    this.queryOptions = queryOptions;

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);

    this.getModel = this.getModel.bind(this);
  }

  async index(req: Request, res: Response) {
    const items = await this.model.findAll(this.queryOptions);

    return res.status(200).json({
      status: 'success',
      data: {
        [this.collectionName]: items,
      },
    });
  }

  async show(req: Request, res: Response) {
    try {
      const item = await this.getModel(req.params[this.paramName]);
      if (!item) return BaseController.missingModel(res);

      return res.status(200).json({
        status: 'success',
        data: {
          [this.model.name.toLowerCase()]: item,
        },
      });
    } catch (err) {
      return BaseController.missingModel(res);
    }
  }

  async create(req: Request, res: Response) {
    const errors = BaseController.errorCheck(req);
    if (errors) return res.status(422).json({ status: 'error', errors });

    delete req.body.createdAt;
    delete req.body.updatedAt;

    try {
      const item = await this.model.create(req.body);
      if (!item) return res.status(422).json({ errors: [`Invalid format of ${this.model.name} model`] });

      return res.status(201).json({
        status: 'success',
        data: {
          [this.model.name.toLowerCase()]: item,
        },
      });
    } catch (err) {
      return res.status(422).json({ errors: [err] });
    }
  }

  async getModel(id: string) {
    const item = await this.model.findByPk(id, this.queryOptions);
    return item;
  }

  static missingModel(res: Response) {
    return res.status(404).json({
      status: 'error',
      error: 'Not found',
    });
  }

  static errorCheck(req: Request) {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return errors.array({ onlyFirstError: true });
    }
    return undefined;
  }

  // override this method
  public static validateCreate() {
    logger.error('You must override the validateCreate method!');
  }
}
