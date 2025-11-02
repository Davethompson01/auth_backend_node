


import express from "express";
import Auth from "../controller/AUTH/Auth.js";
import verifyKey from "../middlewares/verifyKey.ts";
import authentication from "../middlewares/roleMiddleWare.js";

const router = express.Router();
const auth = new Auth();
const roleauthentication = authentication('admin')

router.post(
  "/createAccount",
  verifyKey,
  authentication("admin"), // checks JWT + role
  async (req, res) => {
    const { username, email, password } = req.body;
    const createUser = await auth.createUser(username, email, password);
    res.status(200).json(createUser);
  }
);
