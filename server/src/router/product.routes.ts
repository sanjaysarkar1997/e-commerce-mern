import express from "express";
import { check } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getAllActiveProducts,
  getProduct,
  softDeleteProduct,
} from "../controller/product.controller";

import {
  isAuthenticatedUser,
  isAuthenticatedAdmin,
} from "../Middleware/auth.middleware";

const router = express.Router();

// product validate
const productValidate = [
  check("name", "Name is required").notEmpty(),
  check("price", "Price is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
  check("image", "Image is required").notEmpty(),
  check("category", "Category is required").notEmpty(),
];

// product routes

// admin routes
router.post(
  "/create-product",
  productValidate,
  isAuthenticatedAdmin,
  createProduct
);
router.post("/get-all-products", isAuthenticatedAdmin, getAllActiveProducts);
router.post("/delete-product/:id", isAuthenticatedAdmin, softDeleteProduct);
router.post(
  "/delete-product-permanent/:id",
  isAuthenticatedAdmin,
  deleteProduct
);

// user routes
router.get("/get-all-active-products", getAllActiveProducts);
router.get("/get-product/:id", getProduct);

export default router;
