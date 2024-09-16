import mongoose from "mongoose";

const blogcatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const blogcatModal = mongoose.model("blogCategory", blogcatSchema);
export default blogcatModal;
