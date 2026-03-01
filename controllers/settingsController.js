import * as settingsModel from "../models/settingsModel.js";

// @desc    Get user settings
// @route   GET /api/settings
// @access  Private
export const getUserSettings = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data, error } = await settingsModel.getUserSettings(userId);

        if (error && error.code !== 'PGRST116') { // PGRST116 is code for "no rows returned" in single()
            return res.status(400).json({ success: false, message: error.message });
        }

        // If no settings exist yet, create default settings
        if (!data) {
            const defaultSettings = {
                user_id: userId,
                feeding_reminders: true,
                medication_reminders: true,
                vet_reminders: true,
                email_notifications: true
            };

            const { data: newData, error: newError } = await settingsModel.createUserSettings(defaultSettings);

            if (newError) {
                return res.status(400).json({ success: false, message: newError.message });
            }

            return res.status(200).json({ success: true, data: newData[0] });
        }

        res.status(200).json({ success: true, data });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user settings
// @route   PUT /api/settings
// @access  Private
export const updateUserSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        // Safety check - prevent modifying restricted fields
        delete updates.id;
        delete updates.user_id;
        delete updates.created_at;

        const { data, error } = await settingsModel.updateUserSettings(userId, updates);

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        if (!data || data.length === 0) {
            // If updating failed because settings row didn't exist, create it with the provided updates
            const newSettings = { user_id: userId, ...updates };
            const { data: newData, error: newError } = await settingsModel.createUserSettings(newSettings);

            if (newError) return res.status(400).json({ success: false, message: newError.message });

            return res.status(200).json({ success: true, data: newData[0], message: "Settings created and updated" });
        }

        res.status(200).json({ success: true, data: data[0], message: "Settings updated successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
