import { NextFunction, Request, Response } from 'express';

// Middleware error handler for json response
// eslint-disable-next-line no-unused-vars
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const output = {
    status: 'error',
    error: {
      name: err.name,
      message: err.message,
      text: err.toString(),
    },
  };
  const statusCode = err.status || 500;
  res.status(statusCode).json(output);
};
