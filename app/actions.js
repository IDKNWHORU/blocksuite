"use server";

const cache = {
  content: {},
};

export async function getContent() {
  return cache.content;
}

export async function create(content) {
  cache.content = content;
}
