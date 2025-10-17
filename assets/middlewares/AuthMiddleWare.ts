import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export default function authMiddleware(req, res) {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server misconfigured: SECRET_KEY missing" }));
    return false;
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "No token provided" }));
    return false;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Token format invalid" }));
    return false;
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    return true;
  } catch (err) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid or expired token" }));
    return false;
  }
}
