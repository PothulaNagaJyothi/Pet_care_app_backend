import * as weightModel from "../models/weightLogModel.js";
import * as petModel from "../models/petModel.js";

export const createWeightLog = async (req, res) => {
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

    const weightData = {
      ...req.body,
      pet_id: petId
    };

    const { data, error } =
      await weightModel.createWeightLog(weightData);

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

export const getWeightLogs = async (req, res) => {
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
      await weightModel.getWeightLogsByPet(petId);

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

export const updateWeightLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: weightLog, error: fetchError } =
      await weightModel.getWeightLogById(id);

    if (fetchError || !weightLog) {
      return res.status(404).json({
        success: false,
        message: "Weight log not found"
      });
    }

    if (weightLog.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { data, error } =
      await weightModel.updateWeightLog(id, req.body);

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

export const deleteWeightLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: weightLog, error: fetchError } =
      await weightModel.getWeightLogById(id);

    if (fetchError || !weightLog) {
      return res.status(404).json({
        success: false,
        message: "Weight log not found"
      });
    }

    if (weightLog.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { error } =
      await weightModel.deleteWeightLog(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Weight log deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};