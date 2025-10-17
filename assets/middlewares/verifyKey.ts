import dotenv from "dotenv";
dotenv.config();

export default function verifyKey(req, res) {
  const clientKey = req.headers["x-api-key"];
  const serverKey = process.env.API_KEY;

  if (!clientKey) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "API key missing" }));
    return false;
  }

  if (clientKey !== serverKey) {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid API key" }));
    return false;
  }

  return true;
}
