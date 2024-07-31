import doctorModel from "../models/doctorModel.js";
import userModal from "../models/userModel.js";

const getallDctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).send({
      message: "doctors not found",
      success: false,
      error,
    });
  }
};

const getallUsers = async (req, res) => {
  try {
    const users = await userModal.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).send({
      message: "users not found",
      success: false,
      error,
    });
  }
};

export { getallDctors, getallUsers };
