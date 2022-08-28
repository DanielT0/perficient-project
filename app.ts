import dotenv from "dotenv";
import Server from "./server";
import Database from "./db/db";
import express, { application } from "express";
dotenv.config({ path: "./config.env" });

const app = express();
app.use(
  express.json({
    limit: "10kb",
  })
);

const server = new Server(app);
const db = new Database();
server.listen();
db.connect();
