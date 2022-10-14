import winston from 'winston';

export default winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'log/default.log' }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});
