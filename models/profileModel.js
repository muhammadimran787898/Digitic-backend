import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    profile: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      age: { type: Number },
      bio: { type: String },
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timeStamp: true }
);

const profileModel = mongoose.model("Profile", profileSchema);
export default profileModel;
