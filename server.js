import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { ConnectDb } from "./config/connectdb.js";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import winston from "winston";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//middlewere
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json("something Broke!");
});

app.use("/api/v1", router);
app.use("*", (req, res) => {
  res.status(200).json({ message: "route not found" });
});

ConnectDb();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
