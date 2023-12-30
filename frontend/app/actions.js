"use server";

export async function getPostList() {
  const getPostListResponse = await fetch("http://localhost:8080/post", {
    cache: "no-store",
  });

  if (!getPostListResponse.ok) return [];

  return await getPostListResponse.json();
}

export async function getPost(id) {
  const getPostResponse = await fetch(`http://localhost:8080/post/${id}`);

  if (!getPostResponse.ok)
    throw new Error("게시글을 불러오는 중에 문제가 발생했습니다.");

  return await getPostResponse.json();
}

export async function newPost(title, content) {
  const createPostResponse = await fetch("http://localhost:8080/post", {
    method: "POST",
    body: JSON.stringify({ title, content: content }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!createPostResponse.ok) throw new Error("Failed to fetch data");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createPostResponse.text());
    }, 1000);
  });
}
