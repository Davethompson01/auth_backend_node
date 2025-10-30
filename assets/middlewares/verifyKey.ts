import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

export default function verifyKey(req: any, res: any, next: Function) {
  const clientKey = req.headers["x-api-key"];
  const serverKey = process.env.API_KEY;

  if (!clientKey) {
    return res.status(401).json({ message: "API key missing" });
  }

  if (!serverKey) {
    return res.status(500).json({ message: "Server misconfigured: API_KEY missing" });
  }

  const clientBuffer = Buffer.from(clientKey);
  const serverBuffer = Buffer.from(serverKey);

  if (clientBuffer.length !== serverBuffer.length) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  const isMatch = crypto.timingSafeEqual(clientBuffer, serverBuffer);
  if (!isMatch) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  
  next();
}
