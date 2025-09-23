import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import router from "./router.js";
import path from "path";
import "./cronJobs.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/note", router);
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(process.env.port, () => {
    console.log("running on port");
  });
});
