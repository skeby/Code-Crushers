import dotenv from "dotenv";
import Answer from "../Models/AnswerModel.js";
import TheoryQuestion from "../Models/TheoryQuestionModel.js";
import Exam from "../Models/ExamModel.js";
import Student from "../Models/StudentModel.js";
import MarkingGuide from "../Models/MarkingGuideModel.js";
import Replicate from "replicate";
dotenv.config();

const replicate = new Replicate({
  auth: `${process.env.AI_KEY}`,
});

const embeddingCache = new Map();

function preprocessText(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

async function scoreAnswer(studentAnswer, guidelines) {
  const input = {
    prompt: `Provide a score(integer) from 0 to 5 depending on how correct the student answer is based on the guidelines: \n\nGuidelines: ${guidelines}\n\nStudent Answer: ${studentAnswer}. only respond with a number.`,
    max_tokens: 150,
  };

  let score = "";
  try {
    for await (const event of replicate.stream(
      "meta/meta-llama-3-8b-instruct",
      { input }
    )) {
      score += event.toString();
    }
  } catch (error) {
    console.error("Error generating score:", error);
    return "An error occurred while generating feedback.";
  }

  const formattedScore = score.trim();
  return formattedScore;
}

async function generateFeedback(studentAnswer, guidelines) {
  const input = {
    prompt: `Provide feedback for the following student answer based on the guidelines:\n\nGuidelines: ${guidelines}\n\nStudent Answer: ${studentAnswer}. only respond with the feedback.\n\nFeedback:`,
    max_tokens: 150,
  };

  let feedbackText = "";
  try {
    for await (const event of replicate.stream(
      "meta/meta-llama-3-8b-instruct",
      { input }
    )) {
      feedbackText += event.toString();
    }
  } catch (error) {
    console.error("Error generating feedback:", error);
    return "An error occurred while generating feedback.";
  }
  return feedbackText.trim();
}

export async function evaluateAnswer(guidelines, studentAnswer) {
  const preprocessedAnswer = preprocessText(studentAnswer);
  const preprocessedGuidelines = preprocessText(guidelines);
  const score = await scoreAnswer(preprocessedAnswer, preprocessedGuidelines);
  const feedback = await generateFeedback(studentAnswer, guidelines);

  return {
    score: score,
    feedback: feedback,
  };
}

export const submitTheoryAnswer = async (req, res) => {
  const { studentId, questionId, answerText, course, examId } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const question = await TheoryQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const exam = await Exam.findById(question.examId);
    if (!exam || exam.course !== question.course) {
      return res
        .status(404)
        .json({ message: "Exam not found or does not match question course" });
    }

    // const marking_guide_req = await MarkingGuide.find({questionId: questionId});
    // if (!marking_guide_req) {
    //     return res.status(404).json({ message: 'marking guide not found' });
    // }

    // const marking_guide = marking_guide_req[0].guide;
    const marking_guide = question.correctAnswer;
    console.log(
      "the marking guide=> " +
        JSON.stringify(marking_guide) +
        "my answer =>" +
        answerText
    );

    const result = await evaluateAnswer(marking_guide, answerText);

    console.log("the ai res=> " + JSON.stringify(result));

    // const isCorrect = answerText.trim() === question.correctAnswer.trim();

    const studentAnswer = new Answer({
      questionId,
      course,
      answerText,
      questionType: "theory",
    });
    await studentAnswer.save();

    //  const score = isCorrect ? 5 : 0;
    console.log(result.score);
    const score = Number(result.score) ?? 0;
    const feedback = result.feedback;

    const studentExamIndex = student.scores.findIndex(
      (score) =>
        score.examId.toString() === examId && score.questionType === "theory"
    );
    if (studentExamIndex !== -1) {
      student.scores[studentExamIndex].score += score;
    } else {
      student.takenExams.push({
        examId: exam._id,
        course: exam.course,
        score: score,
        feedback,
      });
    }

    const scoreIndex = student.scores.findIndex(
      (sc) => sc.examId.toString() === exam._id.toString()
    );
    if (scoreIndex !== -1) {
      student.scores[scoreIndex].score += score;
    } else {
      student.scores.push({
        examId: exam._id,
        course: exam.course,
        score: score,
      });
    }
    exam.theoryQuestions.push(questionId);

    // Add student to the exam's students array if not already added
    if (!exam.student.includes(studentId)) {
      exam.student.push(studentId);
    }
    await exam.save();
    await student.save();

    const totalPossibleTheoryScore = 25;
    const totalTheoryScore = student.scores
      .filter(
        (score) =>
          score.examId.toString() === examId && score.questionType === "theory"
      )
      .reduce((total, score) => total + score.score, 0);

    const theoryPercentage =
      (totalTheoryScore / totalPossibleTheoryScore) * 100;

    console.log(
      "the data sent => " +
        question +
        " ------- " +
        score +
        "------- " +
        theoryPercentage +
        "------ " +
        feedback
    );
    res.status(201).json({
      message: "Answer submitted successfully",
      question,
      score,
      theoryPercentage,
      feedback,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export default submitTheoryAnswer;
