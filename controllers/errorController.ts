import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import AppError from "../utils/appError";

const handleJWTError = () =>
  new AppError("Invalid token. Please login again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again!", 401);

const handleCastError = () => new AppError("User not found", 404);

const handleDuplicateErrorDB = () =>
  new AppError("Duplicate field (email) please use another value", 400);

const sendValidationError = (err: AppError, res: Response) => {
  res.status(422).json({
    error: err,
  });
};

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    const error = err.message;
    res.status(err.statusCode).json({
      error,
    });
    //Programming or other unknown error: don't leak error details
  } else {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    if (
      error.name === "CastError" ||
      err.message === "No user found with that ID"
    )
      error = handleCastError();
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.code === 11000) error = handleDuplicateErrorDB();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    err.name === "ValidationError"
      ? sendValidationError(err, res)
      : sendErrorProd(error, res);
  }
};
