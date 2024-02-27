import { Schema, model } from "mongoose";

const workerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
    id: false,
  }
);

const WorkerModel = model("Worker", workerSchema);
export default WorkerModel;
