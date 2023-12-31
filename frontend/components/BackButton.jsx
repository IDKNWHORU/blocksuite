"use client";

import { useRouter } from "next/navigation";
import "./style.css";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button className="button-back" type="button" onClick={handleBack}>
      뒤로가기
    </button>
  );
}
