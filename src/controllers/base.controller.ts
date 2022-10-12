import { Model } from 'sequelize-typescript';
import { Request, Response } from 'express';

// Type `ModelType` would basically wrap & satisfy the 'this' context of any sequelize helper methods
// eslint-disable-next-line no-unused-vars
type Constructor<T> = new (...args: any[]) => T;
type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;

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
}
