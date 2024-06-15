import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../Models/UserModels.js";
import { generatePassword } from "../Utilities/PasswordGeneration.js";
import { sendEmail } from "../Utilities/Email.js";

dotenv.config();

export const Register = async (req, res) => {
  const { Email, Role } = req.body;

  if (!["Teacher", "Student"].includes(Role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  if (!Email && !Role) {
    return res.status(400).json({ message: "These fields are required" });
  }
  let user = await userModel.findOne({ Email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);
  user = new userModel({
    Email,
    Password: hashedPassword,
    Role,
  });

  await user.save();

  sendEmail(Email, "Your Account Password", `Your password is: ${password}`);

  res.status(201).json({ message: `${Role} registered successfully!` });
};

export const Login = async (req, res) => {
  const { Email, Password } = req.body;

  const user = await userModel.findOne({ Email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const payload = {
    user: {
      id: user.id,
      Role: user.Role,
    },
  };
  jwt.sign(payload, process.env.SECRET, { expiresIn: "1D" }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
};
