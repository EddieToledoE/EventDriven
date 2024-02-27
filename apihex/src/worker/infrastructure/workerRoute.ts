import express from "express";

import { createWorkerController } from "./dependencies";

export const workerRoute = express.Router();

workerRoute.post(
  "/create",
  createWorkerController.run.bind(createWorkerController)
);
