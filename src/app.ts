import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv-flow';

import routes from './routes';
import passportConfig from './config/passport';

dotenv.config({ silent: true });

const app: Application = express();

passportConfig(app);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('', routes);

export default app;
