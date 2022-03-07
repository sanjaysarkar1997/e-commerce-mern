import { Schema } from "mongoose";

export const AddressSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  pin: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: ["home", "office"],
  },
});
