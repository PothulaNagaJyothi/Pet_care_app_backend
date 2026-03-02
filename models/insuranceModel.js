import { supabase } from "../config/supabaseClient.js";

/* =========================
   Create Insurance
========================= */
export const createInsurance = async (data) => {
  return await supabase
    .from("insurance")
    .insert([data])
    .select();
};

/* =========================
   Get ALL Insurance (User Level)
========================= */
export const getInsuranceByUser = async (userId) => {
  return await supabase
    .from("insurance")
    .select(`
      *,
      pets!inner (
        id,
        name,
        user_id
      )
    `)
    .eq("pets.user_id", userId)
    .order("created_at", { ascending: false });
};

/* =========================
   Get Insurance By Pet
========================= */
export const getInsuranceByPet = async (petId) => {
  return await supabase
    .from("insurance")
    .select("*")
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });
};

/* =========================
   Get Insurance By ID
========================= */
export const getInsuranceById = async (id) => {
  return await supabase
    .from("insurance")
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
   Update Insurance
========================= */
export const updateInsurance = async (id, updates) => {
  return await supabase
    .from("insurance")
    .update(updates)
    .eq("id", id)
    .select();
};

/* =========================
   Delete Insurance
========================= */
export const deleteInsurance = async (id) => {
  return await supabase
    .from("insurance")
    .delete()
    .eq("id", id);
};