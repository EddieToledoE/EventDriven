import { Schema, model } from "mongoose";

const AffiliationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    worker: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
    id: false,
  }
);

const AffiliationModel = model("Affiliation", AffiliationSchema);
export default AffiliationModel;
