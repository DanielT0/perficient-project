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
    sendErrorDev(err, res);
};
