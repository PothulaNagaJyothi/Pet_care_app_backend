import { supabase } from "../config/supabaseClient.js";

export const createWeightLog = async (data) => {
  return await supabase
    .from("weight_logs")
    .insert([data])
    .select();
};

export const getWeightLogsByPet = async (petId) => {
  return await supabase
    .from("weight_logs")
    .select("*")
    .eq("pet_id", petId)
    .order("recorded_at", { ascending: true });
};

export const getWeightLogById = async (id) => {
  return await supabase
    .from("weight_logs")
    .select(`
      *,
      pets!inner (
        user_id
      )
    `)
    .eq("id", id)
    .single();
};

export const updateWeightLog = async (id, updates) => {
  return await supabase
    .from("weight_logs")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteWeightLog = async (id) => {
  return await supabase
    .from("weight_logs")
    .delete()
    .eq("id", id);
};