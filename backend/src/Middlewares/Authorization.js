import jwt from "jsonwebtoken";
import Teacher from "../Models/TeacherModel.js";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authorizationHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { userId, role } = decodedToken;

    if (role !== "Teacher") {
      return res
        .status(403)
        .json({ error: "Only teachers are authorized to create exams" });
    }

    const user = await Teacher.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};
export default authMiddleware;

