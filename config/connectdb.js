import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export { ConnectDb };
