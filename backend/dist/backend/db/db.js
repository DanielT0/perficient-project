"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        this.db = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
    }
    connect() {
        mongoose_1.default
            .connect(this.db, {})
            .then(() => {
            console.log("DB connection successful");
        })
            .catch((err) => console.log(err));
    }
}
exports.default = Database;
