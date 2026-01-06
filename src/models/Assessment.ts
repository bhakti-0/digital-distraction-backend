import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema(
  {
    userInfo: {
      age: Number,
      gender: String,
      status: String,
      field: String
    },

    responses: {
      digitalDistraction: {
        type: Map,
        of: Number
      },
      sleepImpact: {
        type: Map,
        of: Number,
        required: false
      }
    },

    score: {
      total: Number,
      level: {
        type: String,
        enum: ["Low", "Moderate", "High"]
      }
    },

    weakAreas: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Assessment", AssessmentSchema);
