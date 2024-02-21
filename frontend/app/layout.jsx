import { headers } from "next/headers";
import "./global.css";

export const metadata = {
  title: "WHORU 블로그",
  description:
    "프로그래밍에 대한 경험을 공유하는 곳입니다. 제 글을 통해 다양한 문제를 해결해 보세요.",
};

export default function RootLayout({ children }) {
  const headerList = headers();
  const pathname = headerList.get("x-pathname");

  return (
    <html lang="en">
      <head>
        <meta
          name="naver-site-verification"
          content={process.env.NAVER_SEARCH_ADVISOR}
        />
      </head>
      <meta
        name="google-site-verification"
        content={process.env.GOOGLE_SEARCH_CONSOLE}
      />
      <body className={pathname === "/" ? "no-scroll" : "scroll"}>
        {children}
      </body>
    </html>
  );
}
