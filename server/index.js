import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import "dotenv/config";

import routeV1 from "./routes/index.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://aichat.aliahad.com", "https://ai-chat-system-design-for-business-customer-care-survice-mkin.vercel.app"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routeV1);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => console.log(`Server is listening on port ${port}`));
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});
