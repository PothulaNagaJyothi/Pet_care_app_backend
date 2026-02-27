import * as petModel from "../models/petModel.js";

export const createPet = async (req, res) => {
  try {
    const userId = req.user.id;

    const petData = {
      ...req.body,
      user_id: userId
    };

    const { data, error } = await petModel.createPet(petData);

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPets = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await petModel.getPetsByUser(userId);

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;

    const { data, error } = await petModel.getPetById(petId, userId);

    if (error) {
      return res.status(404).json({
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

export const updatePet = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;

    const { data, error } = await petModel.updatePet(
      petId,
      userId,
      req.body
    );

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

export const deletePet = async (req, res) => {
  try {
    const userId = req.user.id;
    const petId = req.params.id;

    const { error } = await petModel.deletePet(petId, userId);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};