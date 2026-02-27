import * as routineModel from "../models/routineModel.js";
import * as petModel from "../models/petModel.js";

export const createRoutine = async (req, res) => {
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

    const routineData = {
      ...req.body,
      pet_id: petId
    };

    const { data, error } =
      await routineModel.createRoutine(routineData);

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

export const getRoutines = async (req, res) => {
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
      await routineModel.getRoutinesByPet(petId);

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

export const updateRoutine = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: routine, error: fetchError } =
      await routineModel.getRoutineById(id);

    if (fetchError || !routine) {
      return res.status(404).json({
        success: false,
        message: "Routine not found"
      });
    }

    if (routine.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { data, error } =
      await routineModel.updateRoutine(id, req.body);

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

export const deleteRoutine = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: routine, error: fetchError } =
      await routineModel.getRoutineById(id);

    if (fetchError || !routine) {
      return res.status(404).json({
        success: false,
        message: "Routine not found"
      });
    }

    if (routine.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { error } =
      await routineModel.deleteRoutine(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Routine deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};