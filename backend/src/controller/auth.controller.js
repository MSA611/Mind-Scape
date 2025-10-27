import { generateToken } from "../lib/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const SignIn = async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
    if (!fullName || !password || !email)
      return res.status(400).json({ message: "Please fill all the details" });

    if (password.length)
      return res
        .status(400)
        .json({ message: "Password should be 6 characters" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPass,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
    res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In SignIn function" });
  }
};

export const Logout = async (_, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "User logged Out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error In Logout function" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all the details" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exits" });

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return res.status(400).json({ message: "Invalid Password" });

    generateToken(user._id, res);
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In Login function" });
  }
};
