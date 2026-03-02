import { supabase } from "../config/supabaseClient.js";

export const createRoutine = async (data) => {
  return await supabase
    .from("routines")
    .insert([data])
    .select();
};

export const getRoutinesByUser = async (userId) => {
  return await supabase
    .from("routines")
    .select(`
      *,
      pets!inner (
        id,
        name,
        user_id
      )
    `)
    .eq("pets.user_id", userId)
    .order("scheduled_time", { ascending: true });
};

export const getRoutinesByPet = async (petId) => {
  return await supabase
    .from("routines")
    .select("*")
    .eq("pet_id", petId)
    .order("scheduled_time", { ascending: true });
};

export const getRoutineById = async (id) => {
  return await supabase
    .from("routines")
    .select(`
      *,
      pets!inner (
        user_id
      )
    `)
    .eq("id", id)
    .single();
};

export const updateRoutine = async (id, updates) => {
  return await supabase
    .from("routines")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteRoutine = async (id) => {
  return await supabase
    .from("routines")
    .delete()
    .eq("id", id);
};