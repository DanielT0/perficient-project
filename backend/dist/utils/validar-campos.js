"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("./appError"));
const { validationResult } = require("express-validator");
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new appError_1.default(errors.errors[0].msg, 422));
    }
    next();
};
exports.default = validarCampos;
