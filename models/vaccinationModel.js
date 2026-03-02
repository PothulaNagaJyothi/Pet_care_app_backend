import { supabase } from "../config/supabaseClient.js";

/* =========================
   Create Vaccination
========================= */
export const createVaccination = async (vaccinationData) => {
  return await supabase
    .from("vaccinations")
    .insert([vaccinationData])
    .select();
};

/* =========================
   Get ALL Vaccinations (User Level)
========================= */
export const getVaccinationsByUser = async (userId) => {
  return await supabase
    .from("vaccinations")
    .select(`
      *,
      pets!inner (
        id,
        name,
        user_id
      )
    `)
    .eq("pets.user_id", userId);
};

/* =========================
   Get Vaccinations By Pet
========================= */
export const getVaccinationsByPet = async (petId) => {
  return await supabase
    .from("vaccinations")
    .select("*")
    .eq("pet_id", petId);
};

/* =========================
   Get Vaccination By ID
========================= */
export const getVaccinationById = async (id) => {
  return await supabase
    .from("vaccinations")
    .select(`
      *,
      pets!inner (
        user_id
      )
    `)
    .eq("id", id)
    .single();
};

/* =========================
   Update Vaccination
========================= */
export const updateVaccination = async (id, updates) => {
  return await supabase
    .from("vaccinations")
    .update(updates)
    .eq("id", id)
    .select();
};

/* =========================
   Delete Vaccination
========================= */
export const deleteVaccination = async (id) => {
  return await supabase
    .from("vaccinations")
    .delete()
    .eq("id", id);
};