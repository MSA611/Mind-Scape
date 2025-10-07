import jwt from "jsonwebtoken";
import User from "./user.model.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(403)
        .json({ message: "Token Does Not Exists For The User" });

    const decode = jwt.verify(token, process.env.jwt_secret);
    if (!decode)
      return res.status(403).json({ message: "User Has Token But Not Valid" });

    const user = await User.findById(decode.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Failed To Authenticate User" });
    next(error);
  }
};

export default authenticate;
