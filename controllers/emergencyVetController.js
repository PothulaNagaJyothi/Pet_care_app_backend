import * as emergencyVetModel from "../models/emergencyVetModel.js";

/* =========================
   CREATE Emergency Vet
========================= */
export const createEmergencyVet = async (req, res) => {
  try {
    const { data, error } =
      await emergencyVetModel.createEmergencyVet(req.body);

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
   GET ALL Emergency Vets
========================= */
export const getEmergencyVets = async (req, res) => {
  try {
    const { data, error } =
      await emergencyVetModel.getEmergencyVets();

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
   UPDATE Emergency Vet
========================= */
export const updateEmergencyVet = async (req, res) => {
  try {
    const id = req.params.id;

    const { data, error } =
      await emergencyVetModel.updateEmergencyVet(id, req.body);

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
   DELETE Emergency Vet
========================= */
export const deleteEmergencyVet = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } =
      await emergencyVetModel.deleteEmergencyVet(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency vet deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};