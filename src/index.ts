import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import assessmentRoutes from "./routes/assessment.routes";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/assessments", assessmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
