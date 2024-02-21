import { getPost } from "@/app/actions";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

export const revalidate = 0;

export default async function EditPostPage({ params: { postId } }) {
  const post = await getPost(postId);

  return (
    <section className="content">
      <Editor content={JSON.parse(post.content)} id={postId} />
    </section>
  );
}
