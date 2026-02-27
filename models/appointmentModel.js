import { supabase } from "../config/supabaseClient.js";

export const createAppointment = async (appointmentData) => {
  return await supabase
    .from("appointments")
    .insert([appointmentData])
    .select();
};

export const getAppointmentsByPet = async (petId) => {
  return await supabase
    .from("appointments")
    .select("*")
    .eq("pet_id", petId)
    .order("appointment_date", { ascending: true });
};

export const getAppointmentById = async (id) => {
  return await supabase
    .from("appointments")
    .select(`
      *,
      pets (
        user_id
      )
    `)
    .eq("id", id)
    .single();
};

export const updateAppointment = async (id, updates) => {
  return await supabase
    .from("appointments")
    .update(updates)
    .eq("id", id)
    .select();
};

export const deleteAppointment = async (id) => {
  return await supabase
    .from("appointments")
    .delete()
    .eq("id", id);
};