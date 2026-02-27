import { supabase } from "../config/supabaseClient.js";

export const createPost = async (data) => {
  return await supabase
    .from("community_posts")
    .insert([data])
    .select();
};

export const getAllPosts = async () => {
  return await supabase
    .from("community_posts")
    .select("*")
    .order("created_at", { ascending: false });
};

export const getPostsByUser = async (userId) => {
  return await supabase
    .from("community_posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
};

export const getPostById = async (id) => {
  return await supabase
    .from("community_posts")
    .select("*")
    .eq("id", id)
    .single();
};

export const deletePost = async (id) => {
  return await supabase
    .from("community_posts")
    .delete()
    .eq("id", id);
};