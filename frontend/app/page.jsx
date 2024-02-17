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
      <header>
        <h1>프로그래밍 경험을 공유하는 블로그</h1>
        <p>
          이 곳은 프로그래밍에 관한 다양한 경험을 공유하고, 함께 문제를 해결하는
          공간입니다.
        </p>
      </header>
      <main>
        <section>
          {list.map(({ id, title, content }) => {
            return (
              <article>
                <Link className="link" href={`/${id}`} key={id}>
                  <h2>{title}</h2>
                </Link>
                <p>
                  {
                    JSON.parse(content).blocks.children[1].children[0].props
                      .text.delta[0].insert
                  }
                </p>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}
