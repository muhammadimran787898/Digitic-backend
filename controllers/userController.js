import validator from "validator";
import bcrypt from "bcrypt";
import userModal from "../models/userModel.js";
import tokenGenarate from "../util/jwt.js";
import sendEmail from "../util/mailer.js";
import DocterModal from "../models/doctorModel.js";
import { uuid } from "uuidv4";

//register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existUser = await userModal.findOne({ email });

    if (existUser) {
      return res.status(401).json({ message: "user all readyy exist" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const Usersave = new userModal({ name, email, role, password: hashed });
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

  if (!email || !password) {
    return res.status(400).json({ message: "Email or password is missing" });
  }

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
        .select("-password -resetpassowrdlink -resetPasswordExpires");

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

const Applydoctor = async (req, res) => {
  console.log(req, "/////////////////////////////////");
  try {
    const doctor = new DocterModal({ ...req.body, status: "pending" });
    await doctor.save();
    const adminUser = await userModal({ isAdmin: true });

    
    const unseeNotification = adminUser.unseenNotifications;
    unseeNotification.pus({
      type: "apply-doctor-request",
      message: `${doctor.name} has applied for doctor account`,
      data: { doctorId: doctor._id, name: doctor.name },
      onClickPath: "/admin/doctors",
    });

    await userModal.findOneAndUpdate(adminUser._id, { unseeNotification });
    res
      .status(201)
      .json({ success: true, message: "doctor applied successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const notificationseen = async (req, res) => {
  try {
    const user = await userModal.findOne({ _id: req.user.id });
    const seennotification = user.seenNotifications;

    user.unseennotifications = unseennotification;
    user.seennotifications.push(...user.unseenNotifications);
    user.unseennotifications = [];
    // user.seennotifications = unseennotification;

    await user.save();
    const userWithoutSensitiveFields = await userModal
      .findOne({ _id: req.user.id })
      .select("-password ");

    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
      data: userWithoutSensitiveFields,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};

const deletenotification = async (req, res) => {
  try {
    const user = await userModal.findOne({ _id: req.user.id });

    user.unseenotification = [];
    user.seennotifications = [];
    await user.save();

    const userWithoutSensitiveFields = await userModal
      .findOne({ _id: req.user.id })
      .select("-password ");
    res.ststus(200).send({
      success: true,
      message: "notification deleted successfully",
      data: userWithoutSensitiveFields,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};

const approvedDoctor = async (req, res) => {
  try {
    const doctor = await DocterModal.find({ status: approved });
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      message: "doctor not approved",
      success: false,
      error,
    });
  }
};

export {
  register,
  login,
  userDetail,
  resetpassword,
  forgotpassword,
  Applydoctor,
  notificationseen,
  deletenotification,
  approvedDoctor,
};
