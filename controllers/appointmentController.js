import * as appointmentModel from "../models/appointmentModel.js";
import * as petModel from "../models/petModel.js";

/* =========================
   Create Appointment
========================= */
export const createAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pet_id, appointment_date, notes, status } = req.body;

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
      await appointmentModel.createAppointment({
        pet_id,
        appointment_date,
        notes,
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
   Get ALL Appointments (User Level)
========================= */
export const getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } =
      await appointmentModel.getAppointmentsByUser(userId);

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
   Get Appointments By Pet
========================= */
export const getAppointmentsByPet = async (req, res) => {
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

/* =========================
   Update Appointment
========================= */
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

/* =========================
   Delete Appointment
========================= */
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