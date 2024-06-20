import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  scores: [
    {
      examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
      course: { type: String, required: true },
      score: { type: Number },
    },
  ],
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "Student",
  },
  registeredCourses: [
    {
      type: String,
      required: true,
    },
  ],
  takenExams: [
    {
      examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
      feedback: { type: String },
      course: { type: String, required: true },
      score: { type: Number },
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
