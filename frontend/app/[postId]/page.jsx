import dynamic from "next/dynamic";
import { getPost } from "../actions";
import BackButton from "@/components/BackButton";
import Link from "next/link";

const Viewer = dynamic(() => import("@/components/Viewer"), {
  ssr: false,
  loading: () => <p>데이터를 불러오는 중입니다...</p>,
});

export async function generateMetadata({ params: { postId } }) {
  const post = await getPost(postId);

  return {
    title: post.title,
  };
}

export const revalidate = 5;

async function PostContent({ postId }) {
  const post = await getPost(postId);

  return (
    <>
      <div className="create-at-label">
        <p>{post.createAt}</p>
      </div>
      <Viewer content={JSON.parse(post.content)} />
    </>
  );
}

export default async function PostPage({ params: { postId } }) {
  return (
    <>
      <BackButton />
      {process.env.IS_ADMIN === "true" ? (
        <Link href={`/${postId}/edit`}>수정하기</Link>
      ) : null}
      <PostContent postId={postId} />
    </>
  );
}
