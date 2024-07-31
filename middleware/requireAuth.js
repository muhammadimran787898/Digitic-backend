import jwt from "jsonwebtoken";

export default async function authenticateToken(req, res, next) {
  try {
    const token = req.headers.token;

    if (token == null) {
      return res.status(401).json({ message: "no token found " });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: err });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
}
