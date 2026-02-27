import { supabase } from "../config/supabaseClient.js";

export const createInsurance = async (data) => {
  return await supabase
    .from("insurance")
    .insert([data])
    .select();
};

export const getInsuranceByPet = async (petId) => {
  return await supabase
    .from("insurance")
    .select("*")
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });
};

export const getInsuranceById = async (id) => {
  return await supabase
    .from("insurance")
    .select(`
      *,
      pets (
        user_id
      )
    `)
    .eq("id", id)
    .single();
};

export const updateInsurance = async (id, updates) => {
  return await supabase
    .from("insurance")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteInsurance = async (id) => {
  return await supabase
    .from("insurance")
    .delete()
    .eq("id", id);
};