import * as appointmentModel from "../models/appointmentModel.js";
import * as petModel from "../models/petModel.js";

export const createAppointment = async (req, res) => {
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

    const appointmentData = {
      ...req.body,
      pet_id: petId
    };

    const { data, error } =
      await appointmentModel.createAppointment(appointmentData);

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

export const getAppointments = async (req, res) => {
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
      await appointmentModel.getAppointmentsByPet(petId);

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

export const updateAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: appointment, error: fetchError } =
      await appointmentModel.getAppointmentById(id);

    if (fetchError || !appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    if (appointment.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { data, error } =
      await appointmentModel.updateAppointment(id, req.body);

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

export const deleteAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: appointment, error: fetchError } =
      await appointmentModel.getAppointmentById(id);

    if (fetchError || !appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    if (appointment.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { error } =
      await appointmentModel.deleteAppointment(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};