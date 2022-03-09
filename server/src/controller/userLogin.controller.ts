import jwt from "jsonwebtoken";
import { error, success } from "../services/responseModifier";
import { validationResult } from "express-validator";
import { errorLog } from "../services/logServices";
import bcrypt from "bcrypt";
import { User } from "../model/user.modal";
import { Review } from "../model/review.model";

// admin signup controller with async await
const userSignUp = async (req: any, res: any, next: any) => {
  let data = req.body;

  const saltRounds = 10;
  let password = data.password;
  try {
    const errors = await validationResult(req);
    if (errors.isEmpty()) {
      const user = await User.findOne({ email: data.email });
      if (user) {
        res.json(error("User Already Exist", {}, 402));
      } else {
        bcrypt.hash(password, saltRounds, (err: any, hash: string) => {
          // Store hash in your password DB.
          data.password = hash;
          let user = new User(data);
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
      res.json(error("Validation Error", errors.array(), 400));
    }
  } catch (error: any) {
    // res.json(error("Failed", 500));
    errorLog(error.message);
  }
};

// admin login controller with async await
const userLogin = async (req: any, res: any, next: any) => {
  let data = req.body;
  try {
    const errors = await validationResult(req);
    if (errors.isEmpty()) {
      let user = await User.findOne({ email: data.email });
      if (user) {
        delete user.password;
        delete user.__v;

        const reviews = await Review.find({ userId: user.id }).select([
          "-_id",
          "rating",
          "review",
        ]);

        bcrypt.compare(
          data.password,
          user.password,
          (err: any, result: any) => {
            if (result) {
              const token = jwt.sign({ id: user._id }, "Sanjay@1997User", {
                expiresIn: "1w",
              });
              user.reviews = reviews;
              res.json(success("Login Successful", { token, user }, 200));
            } else {
              res.json(error("Password is not valid", {}, 401));
            }
          }
        );
      } else {
        res.json(error("User Not Found", {}, 404));
      }
    } else {
      res.json(error("Validation Error", errors, 400));
    }
  } catch (error: any) {
    // res.json(error("Failed", 500));
    errorLog(error.message);
  }
};

// get user by data controller with async await
const getUserDetails = async (req: any, res: any, next: any) => {
  try {
    let user = await User.findById(req.user.id).select(["-password", "-__v"]);
    const reviews = await Review.find({ userId: req.user.id }).select([
      "rating",
      "review",
      "-_id",
    ]);

    if (user) {
      let data = {
        ...user._doc,
        reviews,
      };
      res.json(success("User Found", data, 200));
    } else {
      res.json(error("User Not Found", {}, 404));
    }
  } catch (error: any) {
    // res.json(error("Failed", 500));
    errorLog(error.message);
  }
};

export { userSignUp, userLogin, getUserDetails };
