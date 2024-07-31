import express from "express";
import authenticateToken from "../middleware/requireAuth.js";

import SchemaValidator from "../middleware/validator.js";
import {
  userRegisterschema,
  forgotpasswordschema,
  resetpasswordSchema,
  userLoginSchema,
} from "../validations/AuthValidations.js";
import { DoctorValidations } from "../validations/DoctorValidations.js";

import {
  register,
  login,
  userDetail,
  forgotpassword,
  resetpassword,
  Applydoctor,
  notificationseen,
  deletenotification,
  approvedDoctor,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", SchemaValidator(userRegisterschema), register);
userRoute.post("/login", SchemaValidator(userLoginSchema), login);
userRoute.get("/userdetail", authenticateToken, userDetail);
userRoute.post(
  "/forgotpassword",
  SchemaValidator(forgotpasswordschema),
  forgotpassword
);
userRoute.post(
  "/resetpassword",
  SchemaValidator(resetpasswordSchema),
  resetpassword
);

///////////////////////Doctor//////////////////////////
userRoute.post(
  "/applydoctor",

  authenticateToken,
  SchemaValidator(DoctorValidations),
  Applydoctor
);

userRoute.get("/approvedDoctor", authenticateToken, approvedDoctor);

userRoute.post("/notificationseen", authenticateToken, notificationseen);
userRoute.post("/deleteallnotification", authenticateToken, deletenotification);

export default userRoute;
