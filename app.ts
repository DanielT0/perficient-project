import dotenv from "dotenv";
import Server from "./server";
import Database from "./db/db";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import express, { application } from "express";
import AppError from "./utils/appError";
import errorHandler from "./controllers/errorController";
dotenv.config({ path: "./config.env" });

const app = express();
app.use(
  express.json({
    limit: "10kb",
  })
);

app.use("/users/", userRouter);
app.use("/", authRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

const server = new Server(app);
const db = new Database();
server.listen();
db.connect();

app.use(errorHandler);
