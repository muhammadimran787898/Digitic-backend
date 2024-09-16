import bcrypt from "bcrypt";
import userModal from "../models/userModel.js";
import tokenGenarate from "../util/jwt.js";
import sendEmail from "../util/mailer.js";
import RefreshtokenGenarate from ".././util/refreshtoken.js";
import AccessTokenGenarate from ".././util/accessToken.js";
import cookieParser from "cookie-parser";
import { uuid } from "uuidv4";

//register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existUser = await userModal.findOne({ email });

    if (existUser) {
      return res.status(401).json({ message: "user all readyy exist" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const Usersave = new userModal({ name, email, password: hashed });
    const user = await Usersave.save();

    res.status(201).json({
      user,
    });
    sendEmail(
      email,
      "user regsitered successfully",
      `Hello ${user.name} reset link sent successfully`
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//userlogin

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = tokenGenarate(user._id);

      const userWithoutSensitiveFields = await userModal
        .findOne({ email })
        .select("-password");

      sendEmail(email, "user login ", `Hello ${user.name} login successfully`);
      return res.status(200).json({
        sucess: true,
        data: {
          token,
          user: userWithoutSensitiveFields,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Error during login process", error });
  }
};

//adminlogin
const adminlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminuser = await userModal.findOne({ email });
    if (adminuser.role !== "admin") {
      res.status(404).json({ message: "not Authorized" });
    }
    const verified = bcrypt.compareSync(password, adminuser.password);

    if (!verified) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = tokenGenarate(adminuser._id);
    const unneceeseryfields = await userModal
      .findOne({ email })
      .select("-password");

    res.status(200).json({
      sucess: true,
      data: {
        token,
        user: unneceeseryfields,
      },
    });
  } catch (error) {}
};

//userdetail

const userDetail = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await userModal.findOne({ _id: id });
    // const { password, ...uwp } = user;

    res.status(201).json({ user });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

///////////////////////all user///////////////////////

const allUser = async (req, res) => {
  try {
    const user = await userModal.find();
    res.status(200).json({ user });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};
/////////////////////del user//////////////////////////

const deleteUser = async (req, res) => {
  const id = req.params.id;
};

//////////////forgotpassword

const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found enter registered email" });
    }

    const resetlink = uuid();
    user.resetpassowrdlink = resetlink;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save;

    const link = `http://localhost:3000/api/v1/user/resetpassword/${resetlink}`;

    await sendEmail(
      email,
      "password reset link sent successfully",
      `Hello ${user.name} here is reset link ${link} `
    );
    user.res.status(201).json({ message: "reset mail sent", id: user._id });
  } catch (error) {}
};

//resetpassword

const resetpassword = async (req, res) => {
  const { password, id } = req.body;

  try {
    const userFind = await userModal.findById({ _id: id });
    const hasedpasssword = await bcrypt.hash(password, 10);

    user.password = hasedpasssword;
    await userFind.save();

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

// ----------------------------Applydoctor///////////////////////////////////l

export {
  register,
  login,
  adminlogin,
  userDetail,
  resetpassword,
  forgotpassword,
};
