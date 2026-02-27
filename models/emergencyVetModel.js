import { supabase } from "../config/supabaseClient.js";

export const createVet = async (data) => {
  return await supabase
    .from("emergency_vets")
    .insert([data])
    .select();
};

export const getAllVets = async () => {
  return await supabase
    .from("emergency_vets")
    .select("*")
    .order("created_at", { ascending: false });
};

export const getVetByCity = async (city) => {
  return await supabase
    .from("emergency_vets")
    .select("*")
    .ilike("city", city);
};

export const updateVet = async (id, updates) => {
  return await supabase
    .from("emergency_vets")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteVet = async (id) => {
  return await supabase
    .from("emergency_vets")
    .delete()
    .eq("id", id);
};