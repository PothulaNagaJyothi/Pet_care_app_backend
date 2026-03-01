import { supabase } from "../config/supabaseClient.js";

// Get user settings
export const getUserSettings = async (userId) => {
    return await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", userId)
        .single();
};

// Create user settings
export const createUserSettings = async (settingsData) => {
    return await supabase.from("user_settings").insert([settingsData]).select();
};

// Update user settings
export const updateUserSettings = async (userId, updates) => {
    return await supabase
        .from("user_settings")
        .update(updates)
        .eq("user_id", userId)
        .select();
};
