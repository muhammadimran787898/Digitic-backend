import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: fals },
    password: { type: String, required: true },
    resetpassowrdlink: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    isDoctor: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    seennotifications: { type: Array, default: [] },
    unseennotifications: { type: Array, default: [] },
  },
  { timestamps: true }
);

const userModal = mongoose.model("user", userSchema);
export default userModal;
