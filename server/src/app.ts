// Npm Modules
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

// Files Modules
import routes from "./router/auth.routes";
import demoUpdateRoutes from "./router/demoUpdate.routes";
import { success } from "./services/responseModifier";
import connectMongoDB from "./db/MongoDB";
import { infoLog } from "./services/logServices";
import cronRunner from "./services/cronService";
import demoMiddleWare from "./Middleware/demo.middleware";
import config from "./config/config";

require("dotenv").config();

const app = express();

// MongoDB Connection
connectMongoDB;

// MiddleWares
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CronRunner
cronRunner();

// Routes
app.use("/api/v1", routes);
app.use("/api/v1", demoUpdateRoutes);

app.get("/", demoMiddleWare, (req, res) => {
  res.json(success("Node Server on Typescript", [], 200));
});

app.listen(Number(config.port) || 3333, "0.0.0.0", () =>
  infoLog(`Server Started on http://localhost:${config.port}`)
);
