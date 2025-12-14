import User from "../models/user.js";
import bcrypt from 'bcryptjs';

import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
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
    console.log("Sign Up error");
    return res.json({ message: "Sign up Error" }).status(500);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ message: "Enter email and password" });
    const userData = await User.find({ email });
    if (!userData)
      return res.status(403).json({ message: "Not found the User" });
    const isPassword = await bcrypt.compare(password, userData.password);
    if (!isPassword) return res.status(400).json({ message: "Invalid Creds" });
    const token = generateToken(newUser._id);
    return res.json({
      success: true,
      userData: newUser,
      token,
      message: "Login is done",
    });
  } catch (error) {
    console.log("Problem in Login");
    res.json({ message: "Problem in Login" });
  }
};
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;
    if (!profilePic) {
      const newUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: false, message: "Error in the update" });
  }
};
