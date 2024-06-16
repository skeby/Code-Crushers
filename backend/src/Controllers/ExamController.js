import Exam from "../Models/ExamModel.js";
import Teacher from "../Models/TeacherModel.js";
import Student from "../Models/StudentModel.js";

export const createExam = async (req, res) => {
  const { course, startTime, endTime, creator } = req.body;

  try {
    const studentList = await Student.find({ registeredCourses: course });
    const studentIds = studentList.map((student) => student._id);

    const newExam = new Exam({
      students: studentIds,
      course,
      startTime,
      endTime,
      creator,
      objectiveQuestions: [],
      theoryQuestions: [],
    });

    const savedExam = await newExam.save();

    const teacher = await Teacher.findById(creator);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    teacher.createdExams.push(savedExam._id);
    await teacher.save();

    res
      .status(201)
      .json({ message: "Exam created successfully!", examId: savedExam._id });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ message: "Server error" });
  }
};

