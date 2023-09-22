import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentsRoutes from "./routes/comments.js";
import bodyParser from "body-parser";
import path from "path";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use("/uploads",express.static(path.join('uploads')))

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(bodyParser.json());
app.use("/user", routes);
app.use("/video", videoRoutes);
app.use("/comment", commentsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on the port ${PORT}`);
});

const DB_url = process.env.CONNECTION_URL;
mongoose
  .connect(DB_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((e) => {
    console.log(e);
  });
