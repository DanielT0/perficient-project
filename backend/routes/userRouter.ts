import { protect, signup } from "./../controllers/authController";
import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserPartially,
} from "./../controllers/userController";
import express from "express";
import validarCampos from "../utils/validar-campos";

const router = express.Router();

router.route("/").post(signup).get(protect, getAllUsers);
router
  .route("/:id")
  .patch(protect, updateUserPartially)
  .get(protect, getUser)
  .delete(protect, deleteUser);
router.put(
  "/:id",
  [
    check("first_name", "First_name field is required").not().isEmpty(),
    check("last_name", "Last_name field is required").not().isEmpty(),
    check("email", "Email field is required").not().isEmpty(),
    check("age", "Age field is required").not().isEmpty(),
    check("image", "Image field is required").not().isEmpty(),
    check("description", "Description field is required").not().isEmpty(),
    validarCampos,
  ],
  updateUser
);

export default router;
