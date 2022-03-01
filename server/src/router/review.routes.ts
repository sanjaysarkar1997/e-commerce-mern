import express from "express";
import { check } from "express-validator";
import { createReview, getAllReviews } from "../controller/review.controller";
import {
  isAuthenticatedAdmin,
  isAuthenticatedUser,
} from "../Middleware/auth.middleware";

const router = express.Router();

// review validate
const reviewValidate = [
  check("review", "Review is required").notEmpty(),
  check("rating", "Rating is required").notEmpty(),
  check("user", "User is required").notEmpty(),
  check("productId", "ProductId is required").notEmpty(),
];

// review routes
router.post(
  "/create-review",
  reviewValidate,
  isAuthenticatedUser,
  createReview
);

router.get("/get-all-reviews", isAuthenticatedAdmin, getAllReviews);

export default router;
