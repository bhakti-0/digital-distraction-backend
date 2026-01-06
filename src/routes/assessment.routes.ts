import { Router } from "express";
import Assessment from "../models/Assessment";

const router = Router();

/**
 * POST /api/assessments
 */
router.post("/", async (req, res) => {
  try {
    const { userInfo, responses } = req.body;

   const digitalAnswers = Object.values(
  responses.digitalDistraction
) as number[];

const totalScore = digitalAnswers.reduce(
  (sum, value) => sum + value,
  0
);

    let level = "Low";
    if (totalScore >= 43) level = "High";
    else if (totalScore >= 25) level = "Moderate";

    const assessment = await Assessment.create({
      userInfo,
      responses,
      score: { total: totalScore, level },
      weakAreas: []
    });

    res.status(201).json({
      success: true,
      result: assessment.score,
      id: assessment._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

/**
 * GET /api/assessments
 */
router.get("/", async (_req, res) => {
  const data = await Assessment.find().sort({ createdAt: -1 });
  res.json(data);
});

export default router;
