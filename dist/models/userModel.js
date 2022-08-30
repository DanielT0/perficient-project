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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoosePaginate = require("mongoose-paginate-v2");
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: [true, "The first name field is required "],
    },
    last_name: {
        type: String,
        required: [true, "The last name field is required."],
    },
    email: {
        type: String,
        required: [true, "The email field is required."],
        unique: true,
    },
    age: {
        type: Number,
        required: [true, "The age field is required."],
    },
    image: String,
    description: String,
    password: {
        type: String,
        required: [true, "The password field is required."],
        select: false,
    },
});
userSchema.plugin(mongoosePaginate);
//Deletes versionKey and transforms _id into id
userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Hash the password with cost of 12
        this.password = yield bcrypt_1.default.hash(this.password || "", 12);
        next();
    });
});
userSchema.methods.compareCorrectPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(candidatePassword, userPassword);
        return yield bcrypt_1.default.compare(candidatePassword, userPassword);
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
