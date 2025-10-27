import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.mongodb).then(() => {
      console.log("connected to mongodb");
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default connectdb;
