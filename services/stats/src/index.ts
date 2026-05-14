import express from "express";

import statsRouter from "./routes/stats";

import { register } from "./metrics/prometheus";

const app = express();

app.use(express.json());

app.use("/", statsRouter);

app.get("/metrics", async (_, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
});

app.listen(5000, () => {
  console.log("Stats Service running on port 5000");
});
