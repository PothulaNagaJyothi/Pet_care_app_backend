import { supabase } from "../config/supabaseClient.js";

export const createPet = async (petData) => {
  return await supabase.from("pets").insert([petData]).select();
};

export const getPetsByUser = async (userId) => {
  return await supabase
    .from("pets")
    .select("*")
    .eq("user_id", userId);
};

export const getPetById = async (petId, userId) => {
  return await supabase
    .from("pets")
    .select("*")
    .eq("id", petId)
    .eq("user_id", userId)
    .single();
};

export const updatePet = async (petId, userId, updates) => {
  return await supabase
    .from("pets")
    .update(updates)
    .eq("id", petId)
    .eq("user_id", userId)
    .select();
};

export const deletePet = async (petId, userId) => {
  return await supabase
    .from("pets")
    .delete()
    .eq("id", petId)
    .eq("user_id", userId);
};