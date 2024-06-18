import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
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
  role: { 
    type: String, 
    default: 'Teacher' },

  department: {
    type: String,
    required: true,
  },
  password:{
    type: String
  },
  createdExams: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }]
  
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;
