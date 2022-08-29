import { login } from "./../controllers/authController";
import { createUser } from "./../controllers/userController";
import express from "express";

const router = express.Router();

router.route("/login").post(login);

export default router;
