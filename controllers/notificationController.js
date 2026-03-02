import { supabase } from "../config/supabaseClient.js";

// Fetch all notifications for the user
export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", userId)
            .eq("is_read", false)
            .order("created_at", { ascending: false })
            .limit(20);

        if (error) throw error;

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Mark a specific notification as Read
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const { error } = await supabase
            .from("notifications")
            .update({ is_read: true })
            .eq("id", id)
            .eq("user_id", userId);

        if (error) throw error;

        res.status(200).json({ success: true, message: "Notification marked as read." });
    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Mark ALL notifications as Read
export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        const { error } = await supabase
            .from("notifications")
            .update({ is_read: true })
            .eq("user_id", userId)
            .eq("is_read", false);

        if (error) throw error;

        res.status(200).json({ success: true, message: "All notifications marked as read." });
    } catch (error) {
        console.error("Error updating notifications:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- HELPER FUNCTION FOR OTHER CONTROLLERS ---
// This is not an Express route handler, it allows other controllers to easily trigger an alert
export const createSystemNotification = async (userId, title, message) => {
    try {
        const { error } = await supabase
            .from("notifications")
            .insert([{ user_id: userId, title, message }]);

        if (error) console.error("Failed to create system notification:", error);
    } catch (error) {
        console.error("Failed to create system notification:", error);
    }
};
