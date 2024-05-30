import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import UserModal from "../models/userModel.js";
import tokenGenarate from "../util/jwt.js";
import { sendWelcomeEmail } from "../util/mailservice.js";

//register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existUser = await UserModal.findOne({ email });

    if (existUser) {
      return res.status(401).json({ message: "user all readyy exist" });
    }
    if (!name || !email || !password) {
      return res.status(401).json({ message: "plz enter all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(401).json({ message: "plz enter all fields" });
    }
    // if (!validator.isStrongPassword(password)) {
    //   return res.status(401).json({ message: "plz enter strong password" });
    // }

    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);

    const Usersave = new UserModal({ name, email, password: hashed });
    const user = await Usersave.save();
    await sendWelcomeEmail(email, name);
    // const vtoken = token(user._id);

    res.status(201).json({
      user,
      // vtoken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//userlogin

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({ message: "filde is null" });
  }
  const user = await UserModal.findOne({ email });
  if (!user) {
    res.status(500).json({ message: "user not found" });
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(500).json({ message: "password not match" });
  }

  const token = tokenGenarate(user._id);
  res.status(200).json({ token, user });
  await sendWelcomeEmail(email);
};

//userinfo

const userinfo = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await UserModal.findOne({ _id: id });
    res.status(201).json({ user });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

//resetpassword

const resetpassword = async (req, res) => {
  const { password, id } = req.body;

  try {
    const userFind = await UserModal.findByIdAndUpdate(
      { _id: id },
      { password: password }
    );

    if (userFind) {
      res.status(200).json({ message: "password reset successfully" });
    }

    if (!userFind) {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { register, login, userinfo, resetpassword };
