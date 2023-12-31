"use server";

const serverURI = process.env.SERVER_URI;

export async function getPostList() {
  const getPostListResponse = await fetch(`${serverURI}/post`, {
    cache: "no-store",
  });

  if (!getPostListResponse.ok) return [];

  return await getPostListResponse.json();
}

export async function getPost(id) {
  const getPostResponse = await fetch(`${serverURI}/post/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!getPostResponse.ok) {
    console.log(getPostResponse, id);
    throw new Error("게시글을 불러오는 중에 문제가 발생했습니다.");
  }

  return await getPostResponse.json();
}

export async function newPost(title, content) {
  const createPostResponse = await fetch(`${serverURI}/post`, {
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
