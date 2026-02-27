import { supabase } from "../config/supabaseClient.js";

export const createMedication = async (data) => {
  return await supabase
    .from("medications")
    .insert([data])
    .select();
};

export const getMedicationsByPet = async (petId) => {
  return await supabase
    .from("medications")
    .select("*")
    .eq("pet_id", petId)
    .order("due_date", { ascending: true });
};

export const getMedicationById = async (id) => {
  return await supabase
    .from("medications")
    .select(`
      *,
      pets (
        user_id
      )
    `)
    .eq("id", id)
    .single();
};

export const updateMedication = async (id, updates) => {
  return await supabase
    .from("medications")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteMedication = async (id) => {
  return await supabase
    .from("medications")
    .delete()
    .eq("id", id);
};