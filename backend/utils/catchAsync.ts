import { NextFunction, Request, Response } from "express";

interface catchAsync {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const catchAsync = (fn: catchAsync) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
