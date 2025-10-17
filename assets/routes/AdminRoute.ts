

import authMiddleware from "../middlewares/AuthMiddleWare.ts";
import verifyKey from "../middlewares/verifyKey.ts";

app.post("/account/create", verifyKey, authMiddleware, (req, res) => {
  // Only gets here if API key + JWT are valid
  res.json({ success: true, message: "Access granted to protected route!" });
});
