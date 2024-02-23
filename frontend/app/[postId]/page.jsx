import dynamic from "next/dynamic";
import { getPost } from "../actions";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { concatText } from "@/functions/text";

const Viewer = dynamic(() => import("@/components/Viewer"), {
  ssr: false,
  loading: () => <p>데이터를 불러오는 중입니다...</p>,
});

export async function generateMetadata({ params: { postId } }) {
  const post = await getPost(postId);

  return {
    title: post.title,
    description: concatText(
      JSON.parse(post.content).blocks.children[1].children[0].props.text.delta
    ),
  };
}

export const revalidate = 0;

async function PostContent({ postId }) {
  const post = await getPost(postId);

  return <Viewer content={JSON.parse(post.content)} />;
}

export default async function PostPage({ params: { postId } }) {
  return (
    <section className="content">
      <header>
        <BackButton />
        {process.env.IS_ADMIN === "true" ? (
          <Link href={`/${postId}/edit`}>수정하기</Link>
        ) : null}
      </header>
      <PostContent postId={postId} />
    </section>
  );
}
