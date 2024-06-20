import dotenv from "dotenv";
import MarkingGuide from "../Models/MarkingGuideModel.js";
import express from "express";
import Replicate from "replicate";
dotenv.config();

const replicate = new Replicate({
  auth: `${process.env.AI_KEY}`,
});

const embeddingCache = new Map();

function preprocessText(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

async function getEmbeddings(text) {
  const cachedEmbedding = embeddingCache.get(text);
  if (cachedEmbedding) return cachedEmbedding;

  try {
    const response = await replicate.run(
      "replicate/all-mpnet-base-v2:b6b7585c9640cd7a9572c6e129c9549d79c9c31f0d3fdce7baac7c67ca38f305",
      {
        input: {
          text: text,
        },
      }
    );
    const embedding = response[0].embedding;
    embeddingCache.set(text, embedding);
    return embedding;
  } catch (error) {
    console.error("Error details:", error);
    if (error.code === "insufficient_quota") {
      console.error(
        "You have exceeded your API quota. Please check your plan and billing details."
      );
    } else if (error.code === "invalid_version" || error.status === 422) {
      console.error(
        "Invalid model version or not permitted. Please check the model version and permissions."
      );
    } else {
      console.error("An error occurred while fetching embeddings:", error);
    }
    return null;
  }
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function containsKeyPhrase(studentAnswer, keyPhrases) {
  const lowerCasedAnswer = studentAnswer.toLowerCase();
  return keyPhrases.some((phrase) =>
    lowerCasedAnswer.includes(phrase.toLowerCase())
  );
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

export const getAiResponse = async (req, res) => {
  const { questionId, answerText } = req.body;

  try {
    const marking_guide_req = await MarkingGuide.find({
      questionId: questionId,
    });
    if (!marking_guide_req) {
      return res.status(404).json({ message: "marking guide not found" });
    }

    const marking_guide = marking_guide_req[0].guide;

    const result = await evaluateAnswer(guidelines, studentAnswer);

    res.status(201).json({ message: "AI response successfully", result });
  } catch (error) {
    console.error("Error fetching all exam:", error);
    res.status(500).json({ message: "Server error" });
  }
};
