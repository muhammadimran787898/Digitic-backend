import jwt from "jsonwebtoken";

export default function AccessTokenGenarate(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
