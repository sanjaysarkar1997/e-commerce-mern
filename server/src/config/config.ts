import Config from "./config.interface";
import configDev from "./config-dev";
import configProd from "./config-prod";

let config: Config;

config = { ...configDev };

if (process.env.NODE_ENV === "production") {
  config = { ...configProd };
}

export default config;
