import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongodb).then(() => {
      console.log("connected to mongodb");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
