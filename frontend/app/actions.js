"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URI;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getPostList() {
  const { data } = await supabase.from("Post").select("id, title");

  return data;
}

export async function getPost(id) {
  const { data } = await supabase.from("Post").select().eq("id", id).single();

  return data;
}

export async function newPost(title, content) {
  const { error } = await supabase.from("Post").insert({ title, content });
}
