import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import router from "./router.js";
import path from "path";
import cors from "cors";
import "./cronJobs.js";
import userRouter from "./user.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", userRouter);
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
    console.log("running on port : ", process.env.port);
  });
});
