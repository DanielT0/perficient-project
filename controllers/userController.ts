import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";

const signToken = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      image: req.body.image,
      description: req.body.description,
      password: req.body.password,
    });
    newUser.password = undefined;
    res.status(201).json({
      data: newUser,
    });
  }
);
