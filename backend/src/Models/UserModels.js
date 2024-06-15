import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    enum: ["Teacher", "Student"],
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);
