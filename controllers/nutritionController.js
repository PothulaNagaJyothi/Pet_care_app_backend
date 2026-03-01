import * as nutritionModel from "../models/nutritionModel.js";

// @desc    Get all nutrition logs for a pet
// @route   GET /api/nutrition/:petId
// @access  Private
export const getNutritionLogsByPet = async (req, res) => {
    try {
        const { petId } = req.params;
        const userId = req.user.id;

        const { data, error } = await nutritionModel.getNutritionLogsByPet(
            petId,
            userId
        );

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(200).json({ success: true, count: data.length, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single nutrition log
// @route   GET /api/nutrition/log/:id
// @access  Private
export const getNutritionLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const { data, error } = await nutritionModel.getNutritionLogById(id, userId);

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ success: false, message: "Nutrition log not found" });
            }
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new nutrition log
// @route   POST /api/nutrition
// @access  Private
export const createNutritionLog = async (req, res) => {
    try {
        const { pet_id, meal_type, food_name, amount, calories, date } = req.body;
        const userId = req.user.id;

        if (!pet_id || !meal_type || !food_name || !amount || !date) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        const logData = {
            user_id: userId,
            pet_id,
            meal_type,
            food_name,
            amount,
            calories: calories || null,
            date
        };

        const { data, error } = await nutritionModel.createNutritionLog(logData);

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(201).json({ success: true, data: data[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update nutrition log
// @route   PUT /api/nutrition/:id
// @access  Private
export const updateNutritionLog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updates = req.body;

        // Security to prevent updating restricted fields
        delete updates.id;
        delete updates.user_id;

        const { data, error } = await nutritionModel.updateNutritionLog(id, userId, updates);

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ success: false, message: "Nutrition log not found or not authorized" });
        }

        res.status(200).json({ success: true, data: data[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete nutrition log
// @route   DELETE /api/nutrition/:id
// @access  Private
export const deleteNutritionLog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const { error } = await nutritionModel.deleteNutritionLog(id, userId);

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        res.status(200).json({ success: true, message: "Nutrition log deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
