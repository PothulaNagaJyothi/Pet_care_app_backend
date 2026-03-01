import { supabase } from "../config/supabaseClient.js";

// Create a new nutrition log
export const createNutritionLog = async (logData) => {
    return await supabase.from("nutrition_logs").insert([logData]).select();
};

// Get all nutrition logs for a specific pet
export const getNutritionLogsByPet = async (petId, userId) => {
    return await supabase
        .from("nutrition_logs")
        .select("*")
        .eq("pet_id", petId)
        .eq("user_id", userId)
        .order("date", { ascending: false });
};

// Get a specific nutrition log by ID
export const getNutritionLogById = async (logId, userId) => {
    return await supabase
        .from("nutrition_logs")
        .select("*")
        .eq("id", logId)
        .eq("user_id", userId)
        .single();
};

// Update a nutrition log
export const updateNutritionLog = async (logId, userId, updates) => {
    return await supabase
        .from("nutrition_logs")
        .update(updates)
        .eq("id", logId)
        .eq("user_id", userId)
        .select();
};

// Delete a nutrition log
export const deleteNutritionLog = async (logId, userId) => {
    return await supabase
        .from("nutrition_logs")
        .delete()
        .eq("id", logId)
        .eq("user_id", userId);
};
