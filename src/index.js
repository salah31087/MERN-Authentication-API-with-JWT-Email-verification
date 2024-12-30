import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./configs/db.js";
import errorHandler from "./middleware/errorHandler.js";
import authenticate from "./middleware/authenticate.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import sessionRoutes from "./routes/session.route.js";
// import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import "dotenv/config";

dotenv.config();

const app = express();

// add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// health check
app.get("/", (_, res) => {
  return res.status(200).json({
    status: "healthy",
  });
});

// auth routes
app.use("/auth", authRoutes);

// protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

// error handler
app.use(errorHandler);

app.listen(4004, async () => {
  console.log(`Server listening on port ${4004} in ${process.env.NODE_ENV} environment`);
  await connectToDatabase();
});
