import { Router } from "express";

import { getQueueStats } from "../queue/stats";

const router = Router();

router.get("/stats", async (_, res) => {
  try {
    const stats = await getQueueStats();

    return res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch stats",
    });
  }
});

export default router;
