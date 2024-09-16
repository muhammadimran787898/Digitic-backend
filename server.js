import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { ConnectDb } from "./config/connectdb.js";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import winston from "winston";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

// Middlewares

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// Error-handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json("Something Broke!");
});

// Swagger middleware to serve documentation

// Your application routes
app.use("/api/v1", router);

// Route not found
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

ConnectDb();

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use.`);

    const server = app.listen(port + 1, () => {
      console.log(`Server is running on port ${port + 1}`);
    });
    process.exit(1); // Exit the application
  } else {
    throw error;
  }
});
