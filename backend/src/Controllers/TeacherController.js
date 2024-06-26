import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "../Models/TeacherModel.js";
import dotenv from "dotenv";
import { generatePassword } from "../Utilities/PasswordGeneration.js";
import { sendEmail } from "../Utilities/Email.js";
import Exam from "../Models/ExamModel.js";

dotenv.config();

export const RegisterTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, department, role } = req.body;

    if (!firstName && !lastName && !email && !department && !role) {
      return res.status(400).json({ message: "These fields are required" });
    }
    let user = await Teacher.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new Teacher({
      firstName,
      lastName,
      email,
      department,
      role,
      password: hashedPassword,
    });
    await user.save();

    sendEmail({
      to: email,
      subject: "Welcome to the System",
      html: `<p>Your password is: ${password}</p>`,
    });

    const { password: pwd, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      message: `${role} registered successfully!`,
      userWithoutPassword,
    });
  } catch (error) {
    console.error("Error registering teacher:", error);
    res.status(500).json(error.message);
  }
};

export const LoginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, teacher.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

        const token = jwt.sign(
            { email: teacher.email, userId: teacher._id, role: teacher.role },
            `${process.env.SECRET}`,
            { expiresIn: "1d" }
        );

    res.status(200).json({ message: "Login successful", token, teacher });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json(error.message);
  }
};

export const GetTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error("Error fetching teacher by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const GetAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    if (teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found" });
    }
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching all teachers:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getStudentsByExam = async (req, res) => {
  const { examId } = req.params;

  try {
    const exam = await Exam.findById(examId).populate(
      "student",
      "firstName lastName email score"
    );
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const students = exam.student;
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default getStudentsByExam;
