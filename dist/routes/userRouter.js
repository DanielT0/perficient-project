"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("./../controllers/authController");
const userController_1 = require("./../controllers/userController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route("/").post(authController_1.signup);
router.route("/:id").patch(authController_1.protect, userController_1.updateUserPartially);
exports.default = router;
