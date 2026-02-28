import { supabase } from "../config/supabaseClient.js";

export const createEmergencyVet = async (data) => {
  return await supabase
    .from("emergency_vets")
    .insert([data])
    .select();
};

export const getEmergencyVets = async () => {
  return await supabase
    .from("emergency_vets")
    .select("*")
    .order("created_at", { ascending: false });
};

export const updateEmergencyVet = async (id, updates) => {
  return await supabase
    .from("emergency_vets")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteEmergencyVet = async (id) => {
  return await supabase
    .from("emergency_vets")
    .delete()
    .eq("id", id);
};