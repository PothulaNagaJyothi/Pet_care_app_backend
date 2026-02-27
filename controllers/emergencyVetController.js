import * as vetModel from "../models/emergencyVetModel.js";

export const createVet = async (req, res) => {
  try {
    const { data, error } =
      await vetModel.createVet(req.body);

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

export const getVets = async (req, res) => {
  try {
    const { city } = req.query;

    let response;

    if (city) {
      response = await vetModel.getVetByCity(city);
    } else {
      response = await vetModel.getAllVets();
    }

    if (response.error) {
      return res.status(400).json({
        success: false,
        message: response.error.message
      });
    }

    res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateVet = async (req, res) => {
  try {
    const id = req.params.id;

    const { data, error } =
      await vetModel.updateVet(id, req.body);

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

export const deleteVet = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } =
      await vetModel.deleteVet(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Vet deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};