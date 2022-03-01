import { Review } from "../model/review.model";
import { success } from "../services/responseModifier";

// get all reviews from the database with async await
const getAllReviews = async (req: any, res: any, next: any) => {
  try {
    let populateQuery = [
      {
        path: "userId",
        select: "name email -_id",
      },
      {
        path: "productId",
        select: "name -_id",
      },
    ];
    let reviews = await Review.find({}).populate(populateQuery);
    res.json(success("Reviews fetched successful", reviews, 200));
  } catch (error: any) {
    res.json(error("Fetch failed", error, 500));
  }
};

// get all active reviews which are not soft deleted from the database with async await
const getAllActiveReviews = async (req: any, res: any, next: any) => {
  try {
    let reviews = await Review.find({ isDeleted: false });
    res.json(success("Reviews", reviews, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// get a single review from the database with async await
const getReview = async (req: any, res: any, next: any) => {
  try {
    let review = await Review.findById(req.params.id);
    res.json(success("Review", review, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

// create review of a product in the database with async await
const createReview = async (req: any, res: any, next: any) => {
  try {
    let review = await Review.create(req.body);
    res.json(success("Review Created", review, 200));
  } catch (error: any) {
    res.json(error("Failed", error, 500));
  }
};

export { getAllReviews, getAllActiveReviews, getReview, createReview };
