import { supabase } from "../config/supabaseClient.js";

export const createVaccination = async (vaccinationData) => {
  return await supabase
    .from("vaccinations")
    .insert([vaccinationData])
    .select();
};

export const getVaccinationsByPet = async (petId) => {
  return await supabase
    .from("vaccinations")
    .select("*")
    .eq("pet_id", petId);
};

export const getVaccinationById = async (id) => {
  return await supabase
    .from("vaccinations")
    .select(`
      *,
      pets (
        user_id
      )
    `)
    .eq("id", id)
    .single();
};

export const updateVaccination = async (id, updates) => {
  return await supabase
    .from("vaccinations")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteVaccination = async (id) => {
  return await supabase
    .from("vaccinations")
    .delete()
    .eq("id", id);
};