import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import TeacherRouter from './Routes/TeacherRoutes.js'
import QuestionRouter from './Routes/QuestionsRoute.js'
import AnswerRouter from './Routes/ExamRoute.js'
import StudentRouter from './Routes/StudentRoute.js'
import AIRouter from "./Routes/AIRouter.js";

const app = express();
app.use(express.json()); 

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://agbakwuruoluchi29:2mNJfvNczG21k197@cluster0.qv7kibt.mongodb.net/ExamManagement`;

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

  app.use('/api/v1/user', TeacherRouter, AIRouter, QuestionRouter, AnswerRouter,StudentRouter );

const PORT = parseInt(process.env.PORT || "4000", 10);

//production path
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"))
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
