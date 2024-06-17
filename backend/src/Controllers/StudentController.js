import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../Models/StudentModel.js';
import dotenv from 'dotenv';
import {generatePassword} from '../Utilities/PasswordGeneration.js'
import {sendEmail} from '../Utilities/Email.js';

dotenv.config();

export const RegisterStudent = async (req, res) => {
    const {firstName,lastName,email,registeredCourses,role} = req.body;

    if(!firstName && !lastName && !email && !registeredCourses && !role){
        return res.status(400).json({ message: 'These fields are required'})
    }
    let user = await Student.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'student already exists' });
    }
    const password = generatePassword();
    user = new Student({
        firstName,
        lastName,
        email,
        registeredCourses,
        role
    });
    await user.save();

    sendEmail({
        to: email,
        subject: 'Welcome to the System',
        html: `<p>Your password is: ${password}</p>`,
    });

    res.status(201).json({ message: `${role} registered successfully!` });
};


export const LoginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        // const isMatch = await bcrypt.compare(password, teacher.password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }

        const token = jwt.sign(
            { email: student.email, userId: student._id, role: student.role },
            process.env.SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ message: 'Login successful', token, student });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const GetStudentById = async (req, res) => {
    try {
        const studentId = req.params.studentId; 

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const GetAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching all students:', error);
        res.status(500).json({ message: 'Server error' });
    }
};