import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://agbakwuruoluchi29:2mNJfvNczG21k197@cluster0.qv7kibt.mongodb.net/ExpenseTracker`

const __dirname = path.resolve();

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongoDB 💥💥💥");
  })
  .catch(() => {
    console.log("error occurred during connection :(");
  });

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = parseInt(process.env.PORT || "4000", 10);

//production path
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"))
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
