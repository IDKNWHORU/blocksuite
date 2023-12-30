import dynamic from "next/dynamic";
import { getPost } from "../actions";

const Viewer = dynamic(() => import("@/components/Viewer"), { ssr: false });

export async function generateMetadata({ params: { postId } }) {
  const post = await getPost(postId);

  return {
    title: post.title,
  };
}

export default async function PostPage({ params: { postId } }) {
  const post = await getPost(postId);

  return <Viewer content={JSON.parse(post.content)} />;
}
