import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendValidationError = (err: AppError, res: Response) => {
  res.status(422).json({
    error: err,
  });
};

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  if (err.name === "ValidationError") {
    sendValidationError(err, res);
  }

  sendErrorDev(err, res);
};
