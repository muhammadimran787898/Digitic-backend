import isAdmin from "../middleware/admin.js";
import requireAuth from "../middleware/requireAuth.js";
import SchemaValidator from "../middleware/validator.js";
import {
  creaetBlog,
  getBlog,
  getAllblog,
  deleteblog,
  updateblog,
  dislikeblog,
  likesblog,
  uploadImages,
} from "../controllers/blogController.js";
import express from "express";

const blogRoute = express.Router();
blogRoute.post("/create", requireAuth, isAdmin, creaetBlog);
blogRoute.get("/get", getBlog);
blogRoute.get("/getall", getAllblog);
blogRoute.delete("/delete", requireAuth, isAdmin, deleteblog);
blogRoute.put("/update", requireAuth, isAdmin, updateblog);
blogRoute.put("/likes", requireAuth, likesblog);
blogRoute.put("/dislike", requireAuth, dislikeblog);
blogRoute.post("/uploadimages", requireAuth, isAdmin, uploadImages);

export default blogRoute;
