import express from "express";
import {
  register,
  login,
  userinfo,
  resetpassword,
} from "../controllers/userController.js";
import authenticateToken from "../middleware/requireAuth.js";

const userRouter = express.Router();

userRouter.put("/user")

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/userinfo", authenticateToken, userinfo);
userRouter.post("/resetpassword", authenticateToken, resetpassword);

export default userRouter;
