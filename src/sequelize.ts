import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv-flow';
import User from './models/User';

dotenv.config();
const sequelize: Sequelize = new Sequelize(
  process.env.CH_DB_NAME as string,
  process.env.CH_DB_USER as string,
  process.env.CH_DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.CH_DB_HOST as string,
    port: Number(process.env.CH_DB_PORT),
    models: [User],
  } as SequelizeOptions,
);

if (process.env.NODE_ENV === 'test') {
  sequelize.options.logging = false;
}

export default sequelize;
