import { Schema, model } from "mongoose";

export const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://bulma.io/images/placeholders/1280x960.png",
  },
  images: {
    type: Array,
    required: false,
    default: ["https://bulma.io/images/placeholders/1280x960.png"],
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export const Product = model("Product", ProductSchema);
