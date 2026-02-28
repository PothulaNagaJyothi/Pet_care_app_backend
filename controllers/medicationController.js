import * as medicationModel from "../models/medicationModel.js";
import * as petModel from "../models/petModel.js";

/* =========================
   Create Medication
========================= */
export const createMedication = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pet_id, medication_name, dosage, due_date, status } = req.body;

    // Verify pet ownership
    const { data: pet, error: petError } =
      await petModel.getPetById(pet_id, userId);

    if (petError || !pet) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to pet"
      });
    }

    const { data, error } =
      await medicationModel.createMedication({
        pet_id,
        medication_name,
        dosage,
        due_date,
        status
      });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================
   Get ALL Medications (User Level)
========================= */
export const getMedications = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } =
      await medicationModel.getMedicationsByUser(userId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================
   Get Medications By Pet
========================= */
export const getMedicationsByPet = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.petId;

    const { data: pet, error: petError } =
      await petModel.getPetById(petId, userId);

    if (petError || !pet) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to pet"
      });
    }

    const { data, error } =
      await medicationModel.getMedicationsByPet(petId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================
   Update Medication
========================= */
export const updateMedication = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: medication, error: fetchError } =
      await medicationModel.getMedicationById(id);

    if (fetchError || !medication) {
      return res.status(404).json({
        success: false,
        message: "Medication not found"
      });
    }

    if (medication.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { data, error } =
      await medicationModel.updateMedication(id, req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* =========================
   Delete Medication
========================= */
export const deleteMedication = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: medication, error: fetchError } =
      await medicationModel.getMedicationById(id);

    if (fetchError || !medication) {
      return res.status(404).json({
        success: false,
        message: "Medication not found"
      });
    }

    if (medication.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { error } =
      await medicationModel.deleteMedication(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Medication deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};