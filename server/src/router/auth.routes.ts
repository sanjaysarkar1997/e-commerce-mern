import express from "express";
import { Login, signUp, getUserDetails } from "../controller/Auth.controller";
import { isAuthenticated } from "../Middleware/auth.middleware";

const router = express.Router();

router.get("/details", isAuthenticated, getUserDetails);
router.post("/login", Login);
router.post("/signup", signUp);

export default router;
