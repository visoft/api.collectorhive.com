import { Sequelize } from 'sequelize-typescript';

export const sequelize: Sequelize = new Sequelize({
  define: {
    freezeTableName: true,
  },
  database: process.env.CH_DB_NAME,
  dialect: 'postgres',
  username: process.env.CH_DB_USER,
  password: process.env.CH_DB_PASSWORD,
  host: process.env.CH_DB_HOST,
  models: [__dirname + '/models'], // or [Player, Team],
});
