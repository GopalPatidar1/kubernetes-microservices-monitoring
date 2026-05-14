import { Queue } from "bullmq";
import { redis } from "../redis/client";

import { totalJobsCompleted, totalJobsSubmitted, queueLengthMetric } from "../metrics/prometheus";

export const jobQueue = new Queue("jobs", {
  connection: redis,
});

export const getQueueStats = async () => {
  const waiting = await jobQueue.getWaitingCount();

  const active = await jobQueue.getActiveCount();

  const completed = await jobQueue.getCompletedCount();

  const failed = await jobQueue.getFailedCount();

  const delayed = await jobQueue.getDelayedCount();

  totalJobsSubmitted.set(waiting + completed + failed);

  totalJobsCompleted.set(completed);

  queueLengthMetric.set(waiting);

  return {
    queueLength: waiting,
    activeJobs: active,
    delayedJobs: delayed,
    totalCompleted: completed,
    totalFailed: failed,
  };
};
