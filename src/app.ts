import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv-flow';
import routes from './routes';
import sequelize from './sequelize';

dotenv.config();

if (!process.env.CH_PORT) {
  process.exit(1);
}

const app: Application = express();

sequelize.sync();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', routes);

export default app;
