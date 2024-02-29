import express from "express";
import { createAffiliationController } from "./dependencies";

export const affiliationRoute = express.Router();

affiliationRoute.post(
  "/create",
  createAffiliationController.run.bind(createAffiliationController)
);
