import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ usreId }, process.env.jwt_secret, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In generateToken function" });
  }
};
