import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authMiddleware(req: any, res: any, next: Function) {
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    return res.status(500).json({
      message: "Server misconfigured: SECRET_KEY missing",
    });
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token format invalid",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
