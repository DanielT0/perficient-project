"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getAllUsers = exports.updateUser = exports.updateUserPartially = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const APIFeatures_1 = __importDefault(require("../utils/APIFeatures"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, res) => {
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
exports.createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel_1.default.create({
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
}));
exports.updateUserPartially = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let updatedUser = yield userModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: false,
        runValidators: false,
    }).select("+password");
    if (!updatedUser) {
        return next(new appError_1.default("No user found with that ID", 404));
    }
    updatedUser.password = req.body.password || updatedUser.password;
    yield updatedUser.save();
    createSendToken(updatedUser, 200, res);
}));
exports.updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedUser) {
        return next(new appError_1.default("No user found with that ID", 404));
    }
    (updatedUser.password = req.body.password), yield updatedUser.save();
    createSendToken(updatedUser, 201, res);
}));
exports.getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(typeof userModel_1.default);
    const api = new APIFeatures_1.default(req);
    const data = yield api.paginate(userModel_1.default, req.query);
    //SEND RESPONSE
    res.status(200).json({
        totalItems: data.totalDocs,
        data: data.docs,
    });
}));
exports.getUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userModel_1.default.findById(req.params.id);
    if (!data) {
        return next(new appError_1.default("User not found", 404));
    }
    res.status(200).json({
        data,
    });
}));
exports.deleteUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield userModel_1.default.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        return next(new appError_1.default("User not found", 404));
    }
    res.status(200).json({
        message: "User deleted successfully!",
    });
}));
