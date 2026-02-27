import { supabase } from "../config/supabaseClient.js";

export const createJournalEntry = async (data) => {
  return await supabase
    .from("health_journal")
    .insert([data])
    .select();
};

export const getJournalByPet = async (petId) => {
  return await supabase
    .from("health_journal")
    .select("*")
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });
};

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

export const updateJournal = async (id, updates) => {
  return await supabase
    .from("health_journal")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteJournal = async (id) => {
  return await supabase
    .from("health_journal")
    .delete()
    .eq("id", id);
};