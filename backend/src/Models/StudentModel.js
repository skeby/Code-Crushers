import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
   
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    // studentId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String, 
        default: 'Student' 
    },
    examsTaken: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
    
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;
