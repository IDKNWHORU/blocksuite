"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URI;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const imageUploadUrl = process.env.IMAGE_UPLOAD_URI;
const imageUploadKey = process.env.IMAGE_UPLOAD_KEY;

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

export async function uploadImage(form, fileKey) {
  form.append("key", imageUploadKey);

  const uploadResponse = await fetch(imageUploadUrl, {
    method: "POST",
    body: form,
  });

  if (uploadResponse.ok) {
    const { data } = await uploadResponse.json();
    const { error } = await supabase
      .from("assets")
      .insert({ id: fileKey, url: data.url });

    return true;
  }
}

export async function getImage(id) {
  const { data } = await supabase.from("assets").select().eq("id", id).single();

  return data.url;
}
