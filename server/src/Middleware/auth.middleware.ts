import jwt from "jsonwebtoken";

import { infoLog } from "../services/logServices";
import { error } from "../services/responseModifier";

const isAuthenticatedUser = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization ? req.headers.authorization : "";
    token = token.split(" ")[1];
    if (token) {
      infoLog(`Request came with token : ${token}`);
      try {
        let decoded = jwt.verify(token, "Sanjay@1997User");
        console.log(decoded);
        if (decoded) {
          req.user = decoded;
          next();
        }
      } catch (err) {
        // err

        res.json(error("Token is not valid", {}, 400));
      }
    } else {
      res.json(error("No Token found", {}, 200));
    }
  } catch (err) {
    // res.json(error(err.message, 300));
  }
};

const isAuthenticatedAdmin = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization ? req.headers.authorization : "";
    token = token.split(" ")[1];
    if (token) {
      infoLog(`Request came with token : ${token}`);
      try {
        let decoded = jwt.verify(token, "Sanjay@1997Admin");
        console.log(decoded);
        if (decoded) {
          req.user = decoded;
          next();
        }
      } catch (err) {
        // err

        res.json(error("Token is not valid", {}, 200));
      }
    } else {
      res.json(error("No Token found", {}, 200));
    }
  } catch (err) {
    // res.json(error(err.message, 300));
  }
};

export { isAuthenticatedUser, isAuthenticatedAdmin };
