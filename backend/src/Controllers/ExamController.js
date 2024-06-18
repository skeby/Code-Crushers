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

export const GetExamById = async (req, res) => {
  try {
      const examId = req.params.examId; 

      const exam = await Exam.findById(examId);
      if (!exam) {
          return res.status(404).json({ message: 'Exam not found' });
      }
      res.status(200).json(exam);
  } catch (error) {
      console.error('Error fetching exam by ID:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

export const GetAllExams = async (req, res) => {
  try {
      const exam = await Exam.find();

      if (exam.length === 0) {
          return res.status(404).json({ message: 'No exams found' });
      }
      res.status(200).json(exam);
  } catch (error) {
      console.error('Error fetching all exam:', error);
      res.status(500).json({ message: 'Server error' });
  }
};