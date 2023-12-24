import dynamic from "next/dynamic";
import { getContent } from "./actions";

const Editor = dynamic(()=> import("./Editor"), {ssr: false});

export default async function App() {
  const content = await getContent();

  return <Editor content={content} />;
}
