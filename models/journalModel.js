import { supabase } from "../config/supabaseClient.js";

/* =========================
   Create Journal Entry
========================= */
export const createJournalEntry = async (data) => {
  return await supabase
    .from("health_journal")
    .insert([data])
    .select();
};

/* =========================
   Get ALL Journal Entries (User Level)
========================= */
export const getJournalByUser = async (userId) => {
  return await supabase
    .from("health_journal")
    .select(`
      *,
      pets (
        id,
        name,
        user_id
      )
    `)
    .eq("pets.user_id", userId)
    .order("created_at", { ascending: false });
};

/* =========================
   Get Journal By Pet
========================= */
export const getJournalByPet = async (petId) => {
  return await supabase
    .from("health_journal")
    .select("*")
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });
};

/* =========================
   Get Journal By ID
========================= */
export const getJournalById = async (id) => {
  return await supabase
    .from("health_journal")
    .select(`
      *,
      pets (
        user_id
      )
    `)
    .eq("id", id)
    .single();
};

/* =========================
   Update Journal Entry
========================= */
export const updateJournal = async (id, updates) => {
  return await supabase
    .from("health_journal")
    .update(updates)
    .eq("id", id)
    .select();
};

/* =========================
   Delete Journal Entry
========================= */
export const deleteJournal = async (id) => {
  return await supabase
    .from("health_journal")
    .delete()
    .eq("id", id);
};