import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./Routes/userRoutes.js";
import flowChartsRoutes from "./Routes/flowCharts.js";
import BarChartRoues from "./Routes/barCharts.js";
import ColoumnChartRoutes from "./Routes/columnCharts.js";

const PORT = 8080;
const server = express();
const JWT_SECRET = process.env.JWT_SECRET;

server.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

server.use(express.json());
server.use(cookieParser());

server.use("/api/checkAuth/", (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, JWT_SECRET);

    if (verified) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (err) {
    console.error(err);
    return res.json(false);
  }
});

server.use("/api/user/", userRoutes);
server.use("/api/flowCharts/", flowChartsRoutes);
server.use("/api/barCharts/", BarChartRoues);
server.use("/api/columnCharts/", ColoumnChartRoutes);

const mongoUri = process.env.MONGOURI;

mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Listen Port: ${PORT}`);
    });
  })
  .catch((err) => {
    throw new Error(err);
  });
