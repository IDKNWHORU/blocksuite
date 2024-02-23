import Link from "next/link";
import { getPostList } from "./actions";
import { concatText } from "@/functions/text";

export const metadata = {
  title: "WHORU 블로그",
};

export const revalidate = 5;

export default async function App() {
  const list = await getPostList();

  return (
    <section className="content">
      <header>
        <h1>프로그래밍 경험을 공유하는 블로그</h1>
        <p>
          이 곳은 프로그래밍에 관한 다양한 경험을 공유하고, 함께 문제를 해결하는
          공간입니다.
        </p>
        {process.env.IS_ADMIN !== "true" ? null : (
          <Link href="/new">새 포스트</Link>
        )}
      </header>
      <main>
        <section className="section">
          {list.map(({ id, title, content }) => {
            return (
              <article className="article" key={id}>
                <Link className="link" href={`/${id}`}>
                  <h2>{title}</h2>
                </Link>
                <p>
                  {concatText(
                    JSON.parse(content).blocks.children[1].children[0].props
                      .text.delta
                  )}
                </p>
              </article>
            );
          })}
        </section>
      </main>
    </section>
  );
}
