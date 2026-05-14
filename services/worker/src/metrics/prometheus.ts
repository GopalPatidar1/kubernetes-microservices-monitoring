import client from "prom-client";

export const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

export const jobsProcessed = new client.Counter({
  name: "jobs_processed_total",
  help: "Total processed jobs",
});

export const jobErrors = new client.Counter({
  name: "job_errors_total",
  help: "Total failed jobs",
});

export const processingTime = new client.Histogram({
  name: "job_processing_time_seconds",
  help: "Job processing duration",
});

register.registerMetric(jobsProcessed);
register.registerMetric(jobErrors);
register.registerMetric(processingTime);
