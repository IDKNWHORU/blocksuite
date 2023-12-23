import dynamic from "next/dynamic";

const Editor = dynamic(()=> import("./Editor"), {ssr: false});

export default async function App() {
  return <Editor />;
}
