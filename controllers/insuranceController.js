import * as insuranceModel from "../models/insuranceModel.js";
import * as petModel from "../models/petModel.js";

/* =========================
   CREATE Insurance Policy
========================= */
export const createInsurance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pet_id } = req.body;

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
      await insuranceModel.createInsurance(req.body);

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
   GET ALL Insurance (User Level)
========================= */
export const getInsurance = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } =
      await insuranceModel.getInsuranceByUser(userId);

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
   GET Insurance By Pet
========================= */
export const getInsuranceByPet = async (req, res) => {
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
      await insuranceModel.getInsuranceByPet(petId);

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
   UPDATE Insurance
========================= */
export const updateInsurance = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: insurance, error: fetchError } =
      await insuranceModel.getInsuranceById(id);

    if (fetchError || !insurance) {
      return res.status(404).json({
        success: false,
        message: "Insurance record not found"
      });
    }

    if (insurance.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { data, error } =
      await insuranceModel.updateInsurance(id, req.body);

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
   DELETE Insurance
========================= */
export const deleteInsurance = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: insurance, error: fetchError } =
      await insuranceModel.getInsuranceById(id);

    if (fetchError || !insurance) {
      return res.status(404).json({
        success: false,
        message: "Insurance record not found"
      });
    }

    if (insurance.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { error } =
      await insuranceModel.deleteInsurance(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Insurance record deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};