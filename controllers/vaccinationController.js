import * as vaccinationModel from "../models/vaccinationModel.js";
import * as petModel from "../models/petModel.js";

export const createVaccination = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.petId;

    // Verify pet belongs to logged-in user
    const { data: pet, error: petError } =
      await petModel.getPetById(petId, userId);

    if (petError || !pet) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to pet"
      });
    }

    const vaccinationData = {
      ...req.body,
      pet_id: petId
    };

    const { data, error } =
      await vaccinationModel.createVaccination(vaccinationData);

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

export const getVaccinations = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.petId;

    // Verify pet ownership
    const { data: pet, error: petError } =
      await petModel.getPetById(petId, userId);

    if (petError || !pet) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to pet"
      });
    }

    const { data, error } =
      await vaccinationModel.getVaccinationsByPet(petId);

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

export const updateVaccination = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    // Fetch vaccination with pet owner
    const { data: vaccination, error: fetchError } =
      await vaccinationModel.getVaccinationById(id);

    if (fetchError || !vaccination) {
      return res.status(404).json({
        success: false,
        message: "Vaccination not found"
      });
    }

    if (vaccination.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { data, error } =
      await vaccinationModel.updateVaccination(id, req.body);

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

export const deleteVaccination = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    // Fetch vaccination with pet owner
    const { data: vaccination, error: fetchError } =
      await vaccinationModel.getVaccinationById(id);

    if (fetchError || !vaccination) {
      return res.status(404).json({
        success: false,
        message: "Vaccination not found"
      });
    }

    if (vaccination.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { error } =
      await vaccinationModel.deleteVaccination(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Vaccination deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};