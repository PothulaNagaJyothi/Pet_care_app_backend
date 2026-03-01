import { supabase } from "../config/supabaseClient.js";
import PDFDocument from "pdfkit";

export const generatePetMedicalReport = async (req, res) => {
    try {
        const { petId } = req.params;
        const userId = req.user.id;

        // 1. Fetch Pet Profile
        const { data: pet, error: petError } = await supabase
            .from("pets")
            .select("*")
            .eq("id", petId)
            .eq("user_id", userId)
            .single();

        if (petError || !pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        // 2. Fetch Medical Data
        const [vaccRes, medRes, weightRes] = await Promise.all([
            supabase.from("vaccinations").select("*").eq("pet_id", petId).order('due_date', { ascending: true }),
            supabase.from("medications").select("*").eq("pet_id", petId),
            supabase.from("weight_logs").select("*").eq("pet_id", petId).order('recorded_at', { ascending: false }).limit(5)
        ]);

        // 3. Setup PDF Streaming via pdfkit
        const doc = new PDFDocument({ margin: 50 });

        // Set response headers for PDF download
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${pet.name.replace(/\s+/g, "_")}_Medical_Report.pdf`
        );

        // Pipe the PDF document directly to the Express response
        doc.pipe(res);

        // --- PDF DESIGN & CONTENT ---

        // Header
        doc
            .fontSize(24)
            .font("Helvetica-Bold")
            .text("Official Medical Report", { align: "center" })
            .moveDown(0.5);

        doc
            .fontSize(10)
            .font("Helvetica")
            .text(`Generated on: ${new Date().toLocaleDateString()}`, { align: "center" })
            .moveDown(2);

        // Pet Profile Section
        doc.fontSize(16).font("Helvetica-Bold").text("Pet Profile");
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Header Line
        doc.moveDown(1);

        doc.fontSize(12).font("Helvetica");
        doc.text(`Name: ${pet.name}`);
        doc.text(`Breed: ${pet.breed}`);
        doc.text(`Age: ${pet.age} years old`);
        doc.text(`Gender: ${pet.gender}`);
        doc.text(`Current Weight: ${pet.weight} kg`);
        if (pet.medical_history) {
            doc.moveDown(0.5);
            doc.font("Helvetica-Oblique").text(`Notes: ${pet.medical_history}`);
        }
        doc.moveDown(2);

        // Vaccinations Section
        doc.fontSize(16).font("Helvetica-Bold").text("Vaccination Record");
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(1);

        if (vaccRes.data && vaccRes.data.length > 0) {
            vaccRes.data.forEach((vacc) => {
                doc.fontSize(12).font("Helvetica-Bold").text(vacc.vaccine_name);
                doc.font("Helvetica").text(
                    `Status: ${vacc.status.toUpperCase()} | Due Date: ${new Date(vacc.due_date).toLocaleDateString()}`
                );
                doc.moveDown(0.5);
            });
        } else {
            doc.fontSize(12).font("Helvetica-Oblique").text("No vaccination records found.");
        }
        doc.moveDown(2);

        // Medications Section
        doc.fontSize(16).font("Helvetica-Bold").text("Active Medications");
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(1);

        if (medRes.data && medRes.data.length > 0) {
            medRes.data.forEach((med) => {
                doc.fontSize(12).font("Helvetica-Bold").text(med.medication_name);
                doc.font("Helvetica").text(
                    `Dosage: ${med.dosage} (${med.frequency}) | Status: ${med.status.toUpperCase()}`
                );
                doc.moveDown(0.5);
            });
        } else {
            doc.fontSize(12).font("Helvetica-Oblique").text("No active medications found.");
        }
        doc.moveDown(2);

        // Recent Weight History
        doc.fontSize(16).font("Helvetica-Bold").text("Recent Weight Trends");
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(1);

        if (weightRes.data && weightRes.data.length > 0) {
            weightRes.data.forEach((w) => {
                doc.fontSize(12).font("Helvetica").text(
                    `${new Date(w.recorded_at).toLocaleDateString()} : ${w.weight} kg`
                );
            });
        } else {
            doc.fontSize(12).font("Helvetica-Oblique").text("No weight history found.");
        }

        // Finalize PDF file
        doc.end();

    } catch (error) {
        console.error("PDF Export Error: ", error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Error generating PDF report" });
        }
    }
};
