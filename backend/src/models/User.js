import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("user", userSchema);

export default User;
