import mongoose from "mongoose";
import { successLog } from "../services/logServices";
import config from "../config/config";

const connectMongoDB = mongoose.connect(
  config.mongoURL || "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: any) => {
    if (err) {
      console.log(err);
    } else {
      successLog("MongoDB Connected");
    }
  }
);

export default connectMongoDB;
