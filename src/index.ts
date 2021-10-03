import * as dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

if (!process.env.CH_PORT) {
  process.exit(1);
}

const app: Application = express();
const PORT: number = parseInt(process.env.CH_PORT as string, 10);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});

try {
  app.listen(PORT, (): void => {
    console.log(` _____       _ _           _             _   _ _           `);
    console.log(`/  __ \\     | | |         | |           | | | (_)          `);
    console.log(`| /  \\/ ___ | | | ___  ___| |_ ___  _ __| |_| |___   _____ `);
    console.log(`| |    / _ \\| | |/ _ \\/ __| __/ _ \\| '__|  _  | \\ \\ / / _ \\`);
    console.log(`| \\__/\\ (_) | | |  __/ (__| || (_) | |  | | | | |\\ V /  __/`);
    console.log(` \\____/\\___/|_|_|\\___|\\___|\\__\\___/|_|  \\_| |_/_| \\_/ \\___|`);
    console.log(`                                                           `);
    console.log(`                                                           `);
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
