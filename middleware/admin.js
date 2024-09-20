import userModal from "../models/userModel.js";

async function isAdmin(req, res, next) {
  try {
    const { email } = req.user;

    const adminUser = await userModal.findOne({ email });

    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default isAdmin;
