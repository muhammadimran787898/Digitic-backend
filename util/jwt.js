import jwt from "jsonwebtoken";

export default function tokenGenarate(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
}
