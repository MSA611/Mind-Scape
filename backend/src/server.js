import express from "express";
import dotenv from "dotenv";
import connectdb from "./db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);

connectdb().then(() => {
  app.listen(process.env.port, () =>
    console.log(`Running on port ${process.env.port}`),
  );
});
