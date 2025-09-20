import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import router from "./router.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/note", router);

connectDB().then(() => {
  app.listen(process.env.port, () => {
    console.log("running on port");
  });
});
