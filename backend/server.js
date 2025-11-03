import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectToDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import session from "express-session";
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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // set to true in production when using HTTPS
      sameSite: "none", // for cross-site in production use 'none' + secure: true
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

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
