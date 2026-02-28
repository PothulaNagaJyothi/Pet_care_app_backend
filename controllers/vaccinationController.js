import * as vaccinationModel from "../models/vaccinationModel.js";
import * as petModel from "../models/petModel.js";

/* =========================
   Create Vaccination
========================= */
export const createVaccination = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pet_id, vaccine_name, due_date, status } = req.body;

    // Verify pet ownership
    const { data: pet, error: petError } =
      await petModel.getPetById(pet_id, userId);

    if (petError || !pet) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to pet",
      });
    }

    const { data, error } =
      await vaccinationModel.createVaccination({
        pet_id,
        vaccine_name,
        due_date,
        status,
      });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   Get ALL Vaccinations (User Level)
========================= */
export const getVaccinations = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } =
      await vaccinationModel.getVaccinationsByUser(userId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   Get Vaccinations By Pet
========================= */
export const getVaccinationsByPet = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.petId;

    const { data: pet, error: petError } =
      await petModel.getPetById(petId, userId);

    if (petError || !pet) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to pet",
      });
    }

    const { data, error } =
      await vaccinationModel.getVaccinationsByPet(petId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   Update Vaccination
========================= */
export const updateVaccination = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: vaccination, error: fetchError } =
      await vaccinationModel.getVaccinationById(id);

    if (fetchError || !vaccination) {
      return res.status(404).json({
        success: false,
        message: "Vaccination not found",
      });
    }

    if (vaccination.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { data, error } =
      await vaccinationModel.updateVaccination(id, req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   Delete Vaccination
========================= */
export const deleteVaccination = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: vaccination, error: fetchError } =
      await vaccinationModel.getVaccinationById(id);

    if (fetchError || !vaccination) {
      return res.status(404).json({
        success: false,
        message: "Vaccination not found",
      });
    }

    if (vaccination.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { error } =
      await vaccinationModel.deleteVaccination(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Vaccination deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};