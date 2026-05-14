import { Worker } from "bullmq";
import { redis } from "../redis/client";

import { calculatePrimes } from "../jobs/prime";
import { hashPassword } from "../jobs/bcrypt";
import { sortLargeArray } from "../jobs/sorting";

import { jobsProcessed, jobErrors, processingTime } from "../metrics/prometheus";

export const worker = new Worker(
  "jobs",
  async (job) => {
    const end = processingTime.startTimer();
    await redis.set(`result:${job.data.jobId}`, JSON.stringify({ success: false, isProcessing: true }));

    try {
      let result: any;

      switch (job.data.type) {
        case "prime":
          result = await calculatePrimes(100000);
          break;

        case "bcrypt":
          result = await hashPassword();
          break;

        case "sort":
          result = sortLargeArray();
          break;

        default:
          throw new Error("Invalid job type");
      }

      await redis.set(
        `result:${job.data.jobId}`,
        JSON.stringify({
          success: true,
          result,
        }),
      );

      jobsProcessed.inc();

      end();
    } catch (error) {
      jobErrors.inc();
      end();

      await redis.set(`result:${job.data.jobId}`, JSON.stringify({ success: false }));

      throw error;
    }
  },
  {
    connection: redis,
    concurrency: 5,
  },
);
