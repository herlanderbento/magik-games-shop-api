import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from './application.error';
import { StatusCodes } from 'http-status-codes';

export const errors = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCodes: err.statusCode,
    });
  }

  console.log(err);

  return res.status(500).json({
    success: false,
    message: err.message,
  });
};

export function sendErrorResponse(err, res: Response) {
  const statusCode =
    err instanceof ApplicationError
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err instanceof ApplicationError ? err.message : err.message;

  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
  });
}
