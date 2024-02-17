import "./global.css";

export const metadata = {
  title: "WHORU 블로그",
  description:
    "안녕하세요, WHORU의 블로그 입니다. 프로그래밍 관련하여 기록을 남기고 있으니 좋은 참고가 되었으면 좋겠습니다.",
};

export default function RootLayout({ children }) {
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
      <body>{children}</body>
    </html>
  );
}
