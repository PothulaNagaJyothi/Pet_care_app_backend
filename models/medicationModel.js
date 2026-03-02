import { supabase } from "../config/supabaseClient.js";

/* =========================
   Create Medication
========================= */
export const createMedication = async (data) => {
  return await supabase
    .from("medications")
    .insert([data])
    .select();
};

/* =========================
   Get ALL Medications (User Level)
========================= */
export const getMedicationsByUser = async (userId) => {
  return await supabase
    .from("medications")
    .select(`
      *,
      pets!inner (
        id,
        name,
        user_id
      )
    `)
    .eq("pets.user_id", userId)
    .order("due_date", { ascending: true });
};

/* =========================
   Get Medications By Pet
========================= */
export const getMedicationsByPet = async (petId) => {
  return await supabase
    .from("medications")
    .select("*")
    .eq("pet_id", petId)
    .order("due_date", { ascending: true });
};

/* =========================
   Get Medication By ID
========================= */
export const getMedicationById = async (id) => {
  return await supabase
    .from("medications")
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
   Update Medication
========================= */
export const updateMedication = async (id, updates) => {
  return await supabase
    .from("medications")
    .update(updates)
    .eq("id", id)
    .select();
};

/* =========================
   Delete Medication
========================= */
export const deleteMedication = async (id) => {
  return await supabase
    .from("medications")
    .delete()
    .eq("id", id);
};