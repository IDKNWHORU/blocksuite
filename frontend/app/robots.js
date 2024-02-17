export default function robots() {
  const rules = [];
  const isNaverSearchAllow =
    process.env.NAVER_SEARCH_ADVISOR !== "" &&
    process.env.NAVER_SEARCH_ADVISOR != null;

  const isGoogleSearchAllow =
    process.env.GOOGLE_SEARCH_CONSOLE !== "" &&
    process.env.GOOGLE_SEARCH_CONSOLE != null;

  if (isNaverSearchAllow === true) {
    rules.push({
      userAgent: "Yeti",
      allow: ["/"],
    });
  }

  if (isGoogleSearchAllow === true) {
    rules.push({
      userAgent: "Googlebot",
      allow: ["/"],
    });
  }

  return {
    rules,
  };
}
