import express from "express";
import { check } from "express-validator";
import { adminSignUp, adminLogin } from "../controller/adminLogin.controller";
import {
  getUserDetails,
  userLogin,
  userSignUp,
} from "../controller/userLogin.controller";
import {
  isAuthenticatedAdmin,
  isAuthenticatedUser,
} from "../Middleware/auth.middleware";

const router = express.Router();

// signup validate
const signUpValidate = [
  check("email", "Email is required").notEmpty(),
  check("email", "Email is not valid").isEmail(),
  check("password", "Password is required").notEmpty(),
  check("password", "Password is not valid").isLength({ min: 6 }),
  check("name", "Name is required").notEmpty(),
  check("phone", "Phone is required").notEmpty(),
  check("phone", "Phone is not valid").isMobilePhone("en-IN"),
];

const loginValidate = [
  check("email", "Email is required").notEmpty(),
  check("email", "Email is not valid").isEmail(),
  check("password", "Password is required").notEmpty(),
  check("password", "Password is not valid").isLength({ min: 6 }),
];

// Admin Routes
router.post("/admin-signup", signUpValidate, adminSignUp);
router.post("/admin-login", loginValidate, adminLogin);

// User Routes
router.post("/user-signup", signUpValidate, userSignUp);
router.post("/user-login", loginValidate, userLogin);
router.get("/user-details", isAuthenticatedUser, getUserDetails);

export default router;
