"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, status, res) => {
    res.status(status).json({
        error: err,
    });
};
const sendValidationError = (err, res) => {
    res.status(422).json({
        error: err,
    });
};
exports.default = (err, req, res, next) => {
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
    if (err.message === "No user found with that ID" ||
        err.name === "CastError") {
        sendErrorProd("User not found", 404, res);
    }
    sendErrorDev(err, res);
};
