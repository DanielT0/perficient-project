import AppError from "./appError";
import { Response, NextFunction, Request } from "express";
const { validationResult } = require("express-validator");

const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new AppError(errors.errors[0].msg, 422));
  }
  next();
};

export default validarCampos;
