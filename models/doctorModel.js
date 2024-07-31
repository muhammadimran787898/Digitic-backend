import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const docterSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    feepercounsultation: { type: String, required: true },
    timings: { type: Array, required: true },
    status: { type: String, default: "pending" },
  },
  { timeStamp: true }
);

const DocterModal = mongoose.model("docter", docterSchema);
export default DocterModal;
