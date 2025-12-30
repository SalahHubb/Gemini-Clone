import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectToDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import { passport } from "./config/passport.js";
import chatRouter from "./routes/chatRoute.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

// app config
const app = express();
const PORT = process.env.PORT || 3000;
connectToDB();

// app configurations
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Initialize Passport and session
app.use(passport.initialize());

// api end points
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Hello from server ..");
});

app.use(globalErrorHandler);

// start the server
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
