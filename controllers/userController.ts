import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const signToken = (id: string) => {
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

export const updateUserPartially = catchAsync(async (req, res, next) => {
  let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    return next(new AppError("No user found with that ID", 404));
  }
  createSendToken(updatedUser, 200, res);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    return next(new AppError("No user found with that ID", 404));
  }
  updatedUser.save();
  createSendToken(updatedUser, 201, res);
});

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await User.find();

    //SEND RESPONSE
    res.status(200).json({
      totalItems: data.length,
      data,
    });
  }
);

export const getUser = catchAsync(async (req, res, next) => {
  const data = await User.findById(req.params.id);
  if (!data) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    data,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    message: "User deleted successfully!",
  });
});
