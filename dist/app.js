"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./db/db"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const express_1 = __importDefault(require("express"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
dotenv_1.default.config({ path: "./config.env" });
const app = (0, express_1.default)();
app.use(express_1.default.json({
    limit: "10kb",
}));
app.use("/users/", userRouter_1.default);
app.use("/", authRouter_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Cannot find ${req.originalUrl} on this server!`, 404));
});
const server = new server_1.default(app);
const db = new db_1.default();
server.listen();
db.connect();
app.use(errorController_1.default);
