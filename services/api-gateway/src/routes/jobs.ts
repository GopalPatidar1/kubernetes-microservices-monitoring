import { Router } from "express";
import { jobQueue } from "../queue/queue";
import { redis } from "../redis/client";
import { v4 as uuid } from "uuid";

const router = Router();

router.post("/submit", async (req, res) => {
  try {
    const jobId = uuid();

    const type = req?.body?.type || "prime";

    await jobQueue.add(
      "process-job",
      {
        jobId,
        type,
      },
      {
        jobId,
      },
    );

    return res.json({
      success: true,
      jobId,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to submit job",
    });
  }
});

router.get("/status/:id", async (req, res) => {
  const jobId = req.params.id;

  const result = await redis.get(`result:${jobId}`);

  if (!result) {
    return res.json({
      status: "NOT_FOUND",
    });
  }

  if (JSON.parse(result).isProcessing) {
    return res.json({
      status: "PROCESSING",
    });
  }

  if (JSON.parse(result).success === false) {
    return res.json({
      status: "FAILED",
    });
  }

  return res.json({
    status: "COMPLETED",
    result: JSON.parse(result),
  });
});

export default router;
