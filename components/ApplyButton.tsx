"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Application, ShortUser } from "@/types/types";
import { APPLICATIONS_OPEN } from "@/app/const";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Application deadline shown on the button.
const DEADLINE_SHORT = "10/28";
const DEADLINE_LONG = "October 28";

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

  // Taller box with the application deadline as a second line, per the updated
  // wireframe (2026 Wireframes (5): 288x170 outline, 283x151 fill, deadline line).
  // Sizes are those native pixels over the hero canvas (2048 x 2103); the fill
  // keeps the original button's offset from the outline (9px right, 19px down).
  // The "!" (rendered by Hero) now pokes up above the box's top-right corner, per
  // the mockup; text sits just left of center, clear of it.
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label={
        APPLICATIONS_OPEN ? `Apply by ${DEADLINE_LONG}` : "Applications closed"
      }
      className="absolute block border-0 bg-transparent p-0 disabled:opacity-70"
      style={{ left: "53.52%", top, width: "14.06%", height: "8.08%" }}
    >
      <span
        aria-hidden
        className="absolute"
        style={{
          left: "3.13%",
          top: "11.18%",
          width: "98.26%",
          height: "88.82%",
        }}
      >
        <Image src={fill} alt="" fill unoptimized />
      </span>
      <Image
        src="/images/hero/button-outline-tall.png"
        alt=""
        fill
        unoptimized
      />
      <span
        aria-hidden
        className={`absolute top-[53%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center whitespace-nowrap font-helvetica font-bold leading-[1.15] ${text}`}
        style={{ left: `${textX}%`, fontSize: "2.5vw" }}
      >
        <span>{APPLICATIONS_OPEN ? "Apply" : "Apps"}</span>
        <span>{APPLICATIONS_OPEN ? `by ${DEADLINE_SHORT}` : "closed"}</span>
      </span>
    </button>
  );
}
