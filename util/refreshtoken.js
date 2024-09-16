import jwt from "jsonwebtoken";

export default function RefreshtokenGenarate(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "24h",
  });
}
