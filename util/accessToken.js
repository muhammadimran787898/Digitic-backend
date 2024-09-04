import jwt from "jsonwebtoken";

const accessTokenGenarate = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};
