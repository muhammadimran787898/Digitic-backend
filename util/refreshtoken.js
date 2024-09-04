import jwt from "jsonwebtoken";

export default function refreshtokenGenarate(id) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
  });
}
