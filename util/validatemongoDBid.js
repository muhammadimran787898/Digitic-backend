import mongoose from "mongoose";

export const ValidatemonogoDBid = (id) => {
  const isvalid = mongoose.Types.ObjectId.isValid(id);
  if (!isvalid) throw new Error("invalid mongoDB id");
};
