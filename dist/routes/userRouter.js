"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("./../controllers/authController");
const express_validator_1 = require("express-validator");
const userController_1 = require("./../controllers/userController");
const express_1 = __importDefault(require("express"));
const validar_campos_1 = __importDefault(require("../utils/validar-campos"));
const router = express_1.default.Router();
router.route("/").post(authController_1.signup);
router.route("/:id").patch(authController_1.protect, userController_1.updateUserPartially);
router.put("/:id", [
    (0, express_validator_1.check)("first_name", "First_name field is required").not().isEmpty(),
    (0, express_validator_1.check)("last_name", "Last_name field is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email field is required").not().isEmpty(),
    (0, express_validator_1.check)("age", "Age field is required").not().isEmpty(),
    (0, express_validator_1.check)("image", "Image field is required").not().isEmpty(),
    (0, express_validator_1.check)("description", "Description field is required").not().isEmpty(),
    validar_campos_1.default,
], userController_1.updateUser);
exports.default = router;
