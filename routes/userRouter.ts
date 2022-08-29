import { signup } from "./../controllers/authController";
import { createUser } from "./../controllers/userController";
import express from "express";

const router = express.Router();

router.route("/").post(signup);

export default router;
