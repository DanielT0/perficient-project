import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { promisify } from "util";

const signToken = (id: string): string => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: UserInterface,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user.id);

  //Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    token: token,
    age: user.age,
    image: user.image,
    description: user.description,
  });
};

export const signup = catchAsync(
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
    createSendToken(newUser, 201, res);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    //1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Error in user or password", 401));
    }

    //2) Check if user exists && password is correct

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (
      !user ||
      !(await user.compareCorrectPassword(password, user.password || ""))
    ) {
      return next(new AppError("Error in user or password", 401));
    }

    createSendToken(user, 200, res);
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //1) Getting token and check if it exists
    let token;
    if (req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return next(new AppError("Token not found", 401));
    }
    //2) Validate token / verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //3) Check if user still exists

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(
        new AppError("The user belonging to this token does not exist", 401)
      );
    }
    req.user = freshUser;
    next();
  }
);
