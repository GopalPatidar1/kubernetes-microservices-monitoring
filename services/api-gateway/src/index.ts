import express from "express";
import jobsRouter from "./routes/jobs";

const app = express();

app.use(express.json());

app.use("/", jobsRouter);

app.listen(3000, () => {
  console.log("Job Submitter running on port 3000");
});
