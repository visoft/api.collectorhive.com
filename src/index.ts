/* eslint-disable no-console */
import * as dotenv from 'dotenv-flow';
import app from './app';

dotenv.config();

const PORT: number = parseInt(process.env.CH_PORT as string, 10);

try {
  app.listen(PORT, (): void => {
    console.log('\x1b[32m', `_____       _ _           _             _   _ _           `);
    console.log(`/  __ \\     | | |         | |           | | | (_)          `);
    console.log(`| /  \\/ ___ | | | ___  ___| |_ ___  _ __| |_| |___   _____ `);
    console.log(`| |    / _ \\| | |/ _ \\/ __| __/ _ \\| '__|  _  | \\ \\ / / _ \\`);
    console.log(`| \\__/\\ (_) | | |  __/ (__| || (_) | |  | | | | |\\ V /  __/`);
    console.log(` \\____/\\___/|_|_|\\___|\\___|\\__\\___/|_|  \\_| |_/_| \\_/ \\___|`);
    console.log(`                                                           `);
    console.log(`                                                           `, '\x1b[0m');
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
