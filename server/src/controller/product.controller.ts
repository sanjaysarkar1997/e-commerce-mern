import { validationResult } from "express-validator";
import slugify from "slugify";
import { Product } from "../model/product.model";
import { Review } from "../model/review.model";
import { error, success } from "../services/responseModifier";

// create a new product and save it to the database with async await
const createProduct = async (req: any, res: any, next: any) => {
  let data = req.body;

  try {
    const errors = await validationResult(req);
    if (errors.isEmpty()) {
      let product = new Product(data);
      product.save((err: any, result: any) => {
        if (err) {
          res.json(error("Save Failed", err, 404));
        } else {
          res.json(success("Creation Successful", [], 201));
        }
      });
    } else {
      res.json(success("Validation Error", errors.array(), 400));
    }
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// get all products from the database with async await
const getAllProducts = async (req: any, res: any, next: any) => {
  try {
    let products = await Product.find({});
    res.json(success("Products", products, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// get all products which are not soft deleted from the database with async await
const getAllActiveProducts = async (req: any, res: any, next: any) => {
  try {
    let products = await Product.find({ isDeleted: false });
    res.json(success("Products", products, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// get a single product from the database with async await
const getProduct = async (req: any, res: any, next: any) => {
  try {
    let product = await Product.findById(req.params.id).select([
      "name",
      "description",
      "price",
      "image",
      "isDeleted",
      "images",
      "slug",
    ]);
    let reviews = await Review.find({ productId: req.params.id }).select([
      "-__v",
      "-productId",
      "-isDeleted",
      "-createdAt",
      "-userId",
      "-_id",
    ]);
    product.reviews = reviews;
    res.json(success("Product", product, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// update a product from the database with async await
const updateProduct = async (req: any, res: any, next: any) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(success("Product Updated", product, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// soft delete a product from the database with async await
const softDeleteProduct = async (req: any, res: any, next: any) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });
    res.json(success("Product Deleted", product, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// delete a product from the database with async await
const deleteProduct = async (req: any, res: any, next: any) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    res.json(success("Product Deleted", product, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// export all the functions
export {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  softDeleteProduct,
  getAllActiveProducts,
};
