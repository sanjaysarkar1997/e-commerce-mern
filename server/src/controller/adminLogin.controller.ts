import jwt from "jsonwebtoken";
import { error, success } from "../services/responseModifier";
import { validationResult } from "express-validator";
import { errorLog } from "../services/logServices";
import bcrypt from "bcrypt";
import { Admin } from "../model/admin.model";

// admin signup controller with async await
const adminSignUp = async (req: any, res: any, next: any) => {
  let data = req.body;

  const saltRounds = 10;
  let password = data.password;
  try {
    const errors = await validationResult(req);
    if (errors.isEmpty()) {
      const user = await Admin.findOne({ email: data.email });
      if (user) {
        res.json(error("Admin Already Exist", {}, 402));
      } else {
        bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
          // Store hash in your password DB.
          data.password = hash;
          let user = new Admin(data);
          user.save((err: any, result: any) => {
            if (err) {
              res.json(error("Save Failed", err, 404));
            } else {
              res.json(success("Creation Successful", [], 201));
            }
          });
        });
      }
    } else {
      res.json(success("Validation Error", errors.array(), 400));
    }
  } catch (error: any) {
    // res.json(error("Failed", 500));
    errorLog(error.message);
  }
};

// admin login controller with async await
const adminLogin = async (req: any, res: any, next: any) => {
  let data = req.body;
  try {
    const errors = await validationResult(req);
    if (errors.isEmpty()) {
      const user = await Admin.findOne({ email: data.email });
      if (user) {
        bcrypt.compare(
          data.password,
          user.password,
          (err: any, result: any) => {
            if (result) {
              const token = jwt.sign({ id: user._id }, "Sanjay@1997Admin", {
                expiresIn: "1h",
              });
              res.json(success("Login Successful", { token }, 200));
            } else {
              res.json(error("Password is not valid", {}, 401));
            }
          }
        );
      } else {
        res.json(error("Admin Not Found", {}, 404));
      }
    } else {
      res.json(success("Validation Error", errors, 400));
    }
  } catch (error: any) {
    // res.json(error("Failed", 500));
    errorLog(error.message);
  }
};

export { adminSignUp, adminLogin };
