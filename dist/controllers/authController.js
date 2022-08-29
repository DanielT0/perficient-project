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
exports.protect = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
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
exports.signup = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel_1.default.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        image: req.body.image,
        description: req.body.description,
        password: req.body.password,
    });
    createSendToken(newUser, 201, res);
}));
exports.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //1) Check if email and password exist
    if (!email || !password) {
        return next(new appError_1.default("Error in user or password", 401));
    }
    //2) Check if user exists && password is correct
    const user = yield userModel_1.default.findOne({ email }).select("+password");
    console.log(user);
    if (!user ||
        !(yield user.compareCorrectPassword(password, user.password || ""))) {
        return next(new appError_1.default("Error in user or password", 401));
    }
    createSendToken(user, 200, res);
}));
exports.protect = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //1) Getting token and check if it exists
    let token;
    if (req.headers.token) {
        token = req.headers.token;
    }
    if (!token) {
        return next(new appError_1.default("Token not found", 401));
    }
    //2) Validate token / verification
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    //3) Check if user still exists
    const freshUser = yield userModel_1.default.findById(decoded.id);
    if (!freshUser) {
        return next(new appError_1.default("The user belonging to this token does not exist", 401));
    }
    req.user = freshUser;
    next();
}));
