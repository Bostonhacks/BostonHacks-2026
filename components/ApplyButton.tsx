"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Application, ShortUser } from "@/types/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface ApplyButtonProps {
  top: string;
  fill: string;
  text: string;
  textX: number;
}

export default function ApplyButton({
  top,
  fill,
  text,
  textX,
}: ApplyButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const userRes = await fetch(`${API_BASE}/user/me`, {
        credentials: "include",
      });
      if (!userRes.ok) {
        router.push("/login");
        return;
      }
      const user: ShortUser = await userRes.json();

      const appRes = await fetch(
        `${API_BASE}/application/user?user_id=${user.id}`,
        { credentials: "include" },
      );
      if (!appRes.ok) throw new Error("Failed to check application status");

      const applications: Application[] = await appRes.json();
      const currentYear = new Date().getFullYear();
      const hasApplication = applications.some(
        (a) => a.applicationYear === currentYear,
      );

      router.push(hasApplication ? "/apply/status" : "/apply");
    } catch {
      // Couldn't confirm status — fall back to the form itself.
      router.push("/apply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="absolute block border-0 bg-transparent p-0 disabled:opacity-70"
      style={{ left: "53.52%", top, width: "14.01%", height: "3.99%" }}
    >
      <span
        aria-hidden
        className="absolute"
        style={{
          left: "3.14%",
          top: "22.62%",
          width: "98.61%",
          height: "77.38%",
        }}
      >
        <Image src={fill} alt="" fill unoptimized />
      </span>
      <Image src="/images/hero/button-outline.png" alt="" fill unoptimized />
      <span
        className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-helvetica font-bold ${text}`}
        style={{ left: `${textX}%`, fontSize: "2.5vw" }}
      >
        Apply
      </span>
    </button>
  );
}
