import userModal from "../models/userModel.js";

export default async function checkAdmin(req, res, next) {
  const id = req.body;
  try {
    const user = await userModal.findById({ _id: id });
    if (!user || user.role !== admin) {
      res.status(403).json({ message: "forbidden Admins only" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
