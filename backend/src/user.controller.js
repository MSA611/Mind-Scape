import User from "./user.model.js";
import bcrypt from "bcrypt";
import generateToken from "./generateToken.js";
import { v2 as cloudinary } from "cloudinary";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Please Fill All The Details" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password Should Be Minimum 6 Characters" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid Email" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User Already Exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json(newUser);
    } else {
      res
        .status(400)
        .json({ message: "SomeThing went wrong while creation of user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed To signup the user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please Fill All The Details" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid Email" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password Should Be Minimum 6 Characters" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email Already Exists Try Another One" });

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return res.status(400).json({ message: "Wrong Password" });

    generateToken(user._id, res);
    res.status(200).json({ message: "User logged In SuccessFully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed To Login The User" });
  }
};

export const logout = async (_, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    if (!profilePic)
      return res.status(400).json({ message: "Upload The profile Picture" });
    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const uploadImgUrl = uploadResponse.secure_url;

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadImgUrl },
      { new: true },
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erorr While Updating the profile" });
  }
};
