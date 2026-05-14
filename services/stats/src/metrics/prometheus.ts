import client from "prom-client";

export const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

export const totalJobsSubmitted = new client.Gauge({
  name: "total_jobs_submitted",
  help: "Total submitted jobs",
});

export const totalJobsCompleted = new client.Gauge({
  name: "total_jobs_completed",
  help: "Total completed jobs",
});

export const queueLengthMetric = new client.Gauge({
  name: "queue_length",
  help: "Current queue length",
});

export const activeJobsMetric = new client.Gauge({
  name: "active_jobs",
  help: "Total active jobs",
});

register.registerMetric(totalJobsSubmitted);
register.registerMetric(totalJobsCompleted);
register.registerMetric(queueLengthMetric);
register.registerMetric(activeJobsMetric);
