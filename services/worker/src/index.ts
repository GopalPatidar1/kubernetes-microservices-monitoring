import express from "express";

import "./queue/worker";

import { register } from "./metrics/prometheus";

const app = express();

app.get("/metrics", async (_, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

app.listen(4000, () => {
  console.log("Worker Service running on port 4000");
});
