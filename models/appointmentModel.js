import { supabase } from "../config/supabaseClient.js";

/* =========================
   Create Appointment
========================= */
export const createAppointment = async (appointmentData) => {
  return await supabase
    .from("appointments")
    .insert([appointmentData])
    .select();
};

/* =========================
   Get ALL Appointments (User Level)
========================= */
export const getAppointmentsByUser = async (userId) => {
  return await supabase
    .from("appointments")
    .select(`
      *,
      pets!inner (
        id,
        name,
        user_id
      )
    `)
    .eq("pets.user_id", userId)
    .order("appointment_date", { ascending: true });
};

/* =========================
   Get Appointments By Pet
========================= */
export const getAppointmentsByPet = async (petId) => {
  return await supabase
    .from("appointments")
    .select("*")
    .eq("pet_id", petId)
    .order("appointment_date", { ascending: true });
};

/* =========================
   Get Appointment By ID
========================= */
export const getAppointmentById = async (id) => {
  return await supabase
    .from("appointments")
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
   Update Appointment
========================= */
export const updateAppointment = async (id, updates) => {
  return await supabase
    .from("appointments")
    .update(updates)
    .eq("id", id)
    .select();
};

/* =========================
   Delete Appointment
========================= */
export const deleteAppointment = async (id) => {
  return await supabase
    .from("appointments")
    .delete()
    .eq("id", id);
};