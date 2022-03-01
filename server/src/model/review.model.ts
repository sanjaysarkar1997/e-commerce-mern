import { Schema, model } from "mongoose";

export const ReviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Review = model("Review", ReviewSchema);
