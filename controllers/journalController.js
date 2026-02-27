import * as journalModel from "../models/journalModel.js";
import * as petModel from "../models/petModel.js";

export const createJournalEntry = async (req, res) => {
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

    const journalData = {
      ...req.body,
      pet_id: petId
    };

    const { data, error } =
      await journalModel.createJournalEntry(journalData);

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

export const getJournalEntries = async (req, res) => {
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
      await journalModel.getJournalByPet(petId);

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

export const updateJournalEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: journal, error: fetchError } =
      await journalModel.getJournalById(id);

    if (fetchError || !journal) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found"
      });
    }

    if (journal.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { data, error } =
      await journalModel.updateJournal(id, req.body);

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

export const deleteJournalEntry = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const { data: journal, error: fetchError } =
      await journalModel.getJournalById(id);

    if (fetchError || !journal) {
      return res.status(404).json({
        success: false,
        message: "Journal entry not found"
      });
    }

    if (journal.pets.user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { error } =
      await journalModel.deleteJournal(id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Journal entry deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};