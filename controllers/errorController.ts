import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import AppError from "../utils/appError";

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: string, status: number, res: Response) => {
  res.status(status).json({
    error: err,
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
  if (err.name === "JsonWebTokenError") {
    sendErrorProd("Token Invalid", 401, res);
  }
  if (err.name === "TokenExpiredError") {
    sendErrorProd("Token Expired", 401, res);
  }

  if (
    err.message === "No user found with that ID" ||
    err.name === "CastError"
  ) {
    sendErrorProd("User not found", 404, res);
  }

  sendErrorDev(err, res);
};
