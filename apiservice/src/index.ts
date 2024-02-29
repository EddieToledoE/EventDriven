import "dotenv/config";
import express from "express";
import cors from "cors";
import dbInit from "../db/mongodb";
import { affiliationRoute } from "./affiliation/infrastructure/affiliationRoute";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/affiliations", affiliationRoute);
dbInit().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
