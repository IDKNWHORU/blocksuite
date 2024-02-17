import Link from "next/link";
import { getPostList } from "./actions";

export const metadata = {
  title: "WHORU 블로그",
};

export const revalidate = 5;

export default async function App() {
  const list = await getPostList();

  return (
    <>
      {list.map(({ id, title, content }) => {
        return (
          <>
            <Link className="link" href={`/${id}`} key={id}>
              <h2>{title}</h2>
            </Link>
            <p>
              {
                JSON.parse(content).blocks.children[1].children[0].props.text
                  .delta[0].insert
              }
            </p>
          </>
        );
      })}
    </>
  );
}
