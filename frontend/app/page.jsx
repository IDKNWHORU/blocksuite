import Link from "next/link";
import { getPostList } from "./actions";

export const metadata = {
  title: "WHORU 블로그",
};

export default async function App() {
  const list = await getPostList();

  return (
    <>
      {list.map(({ id, title, createAt }) => {
        return (
          <h1 key={id}>
            <Link href={`/${id}`}>
              {title} {createAt}
            </Link>
          </h1>
        );
      })}
    </>
  );
}
