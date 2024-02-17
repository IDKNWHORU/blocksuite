import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

export default function createPostPage() {
  if (process.env.IS_ADMIN !== "true") return "관리자만 이용할 수 있습니다.";

  return <Editor content={{}} />;
}
