import express from "express";
import Auth from "../controller/Auth.ts";
import verifyKey from "../middlewares/verifyKey.ts";

const router = express.Router();
const auth = new Auth();

router.post("/createAccount", verifyKey, async (req, res) => {
  const { username, email, password } = req.body;
  const createUser = await auth.createUser(username, email, password);
  res.status(200).json(createUser);
});

export default router;
  