import { use } from "react";
import User from "../models/user";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils";
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;
  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ message: "Signup Problem" }).status(404);
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User Found already" }).status(404);
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new User.create({ fullName, email, password: hashed, bio });
    const token = generateToken(newUser._id);
    return res.json({
      success: true,
      userData: newUser,
      token,
      message: "Sign up is done",
    });
  } catch (error) {
    console.log("Sign Up error")
    return res.json({ message: "Sign up Error" }).status(500);
  }
};
