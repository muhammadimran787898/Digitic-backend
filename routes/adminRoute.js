import { getallDctors, getallUsers } from "../controllers/adminController.js";
import authenticateToken from "../middleware/requireAuth.js";
import express from "express";

const adminRoute = express.Router();

adminRoute.get("/getallDctors", authenticateToken, getallDctors);
adminRoute.get("/getallUsers", authenticateToken, getallUsers);
  
export default adminRoute;
