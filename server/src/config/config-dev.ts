import Config from "./config.interface";
require("dotenv").config();

const config: Config = {
  mongoURL: process.env.MONGO_URL,
  port: process.env.PORT,
};

export default config;
