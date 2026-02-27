import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import petRoutes from "./routes/petRoutes.js";
import vaccinationRoutes from "./routes/vaccinationRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import weightLogRoutes from "./routes/weightLogRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import routineRoutes from "./routes/routineRoutes.js";
import insuranceRoutes from "./routes/insuranceRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import emergencyVetRoutes from "./routes/emergencyVetRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pet Care App Backend API is running"
  });
});

/* API Routes */
app.use("/api/pets", petRoutes);
app.use("/api/vaccinations", vaccinationRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/weight-logs", weightLogRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/routines", routineRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/emergency-vets", emergencyVetRoutes);
app.use("/api/community", communityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});