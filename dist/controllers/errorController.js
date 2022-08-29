"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const handleJWTError = () => new appError_1.default("Invalid token. Please login again", 401);
const handleJWTExpiredError = () => new appError_1.default("Your token has expired! Please log in again!", 401);
const handleCastError = () => new appError_1.default("User not found", 404);
const handleDuplicateErrorDB = () => new appError_1.default("Duplicate field (email) please use another value", 400);
const sendValidationError = (err, res) => {
    res.status(422).json({
        error: err,
    });
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        const error = err.message;
        res.status(err.statusCode).json({
            error,
        });
        //Programming or other unknown error: don't leak error details
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    }
};
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === "production") {
        let error = Object.assign(err);
        if (error.name === "CastError" ||
            err.message === "No user found with that ID")
            error = handleCastError();
        if (error.name === "JsonWebTokenError")
            error = handleJWTError();
        if (error.code === 11000)
            error = handleDuplicateErrorDB();
        if (error.name === "TokenExpiredError")
            error = handleJWTExpiredError();
        err.name === "ValidationError"
            ? sendValidationError(err, res)
            : sendErrorProd(error, res);
    }
};
