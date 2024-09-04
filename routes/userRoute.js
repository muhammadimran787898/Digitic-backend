import express from "express";
import authenticateToken from "../middleware/requireAuth.js";
import SchemaValidator from "../middleware/validator.js";
import {
  userRegisterschema,
  forgotpasswordschema,
  resetpasswordSchema,
  userLoginSchema,
} from "../validations/AuthValidations.js";

import {
  register,
  login,
  userDetail,
  forgotpassword,
  resetpassword,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", SchemaValidator(userRegisterschema), register);
userRoute.post("/login", SchemaValidator(userLoginSchema), login);
userRoute.get("/userdetail", authenticateToken, userDetail);
userRoute.post(
  "/forgotpassword",
  (req, res) => {
    console.log("hello");
  },
  SchemaValidator(forgotpasswordschema),
  forgotpassword
);
userRoute.post(
  "/resetpassword",
  SchemaValidator(resetpasswordSchema),
  resetpassword
);

export default userRoute;
