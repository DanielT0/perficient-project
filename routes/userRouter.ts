import { protect, signup } from "./../controllers/authController";
import {
  createUser,
  updateUserPartially,
} from "./../controllers/userController";
import express from "express";

const router = express.Router();

router.route("/").post(signup);
router.route("/:id").patch(protect, updateUserPartially);

export default router;
