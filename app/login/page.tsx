// app/login/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import { ShortUser, Application } from "@/types/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const buttonClass =
  "block w-full rounded border-2 border-black px-4 py-2 text-center font-helvetica font-bold transition-colors hover:bg-black hover:text-white";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageLoading, setPageLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentApplication, setCurrentApplication] =
    useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  // Handle the redirect back from /auth/google/callback
  // (?success=true&message=successfulLogin&userId=... or ?success=false&error=...)
  useEffect(() => {
    if (searchParams.get("success") === "false") {
      setError(
        searchParams.get("error") || "Google sign-in failed. Please try again.",
      );
    } else if (searchParams.get("success") === "true") {
      setJustLoggedIn(true);
      // Clean the query string off the URL so a refresh doesn't re-show the banner
      router.replace("/login");
    }
  }, [searchParams, router]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/user/me`, {
          credentials: "include",
        });
        if (!response.ok) {
          setLoggedIn(false);
          return;
        }

        const user: ShortUser = await response.json();
        setLoggedIn(true);
        setUserEmail(user.email);

        const applicationsRes = await fetch(
          `${API_BASE}/application/user?user_id=${user.id}`,
          { credentials: "include" },
        );
        if (!applicationsRes.ok)
          throw new Error("Failed to load your application status.");

        const applications: Application[] = await applicationsRes.json();
        const currentYear = new Date().getFullYear();
        setCurrentApplication(
          applications.find((a) => a.applicationYear === currentYear) || null,
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong loading your account.",
        );
      } finally {
        setPageLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const redirectUri = `${window.location.origin}/login`;
      const res = await fetch(
        `${API_BASE}/auth/google/login?redirect_uri=${encodeURIComponent(redirectUri)}`,
        { credentials: "include" },
      );
      const data = await res.json();
      if (!res.ok || !data.url)
        throw new Error(data.message || "Could not start Google sign-in.");

      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not start Google sign-in.",
      );
      setGoogleLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setLoggedIn(false);
    setUserEmail(null);
    setCurrentApplication(null);
    setJustLoggedIn(false);
  };

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center bg-white px-6 py-12 font-akshar text-black">
      <GridBackground />

      <div className="relative w-full max-w-sm scale-[1.4] rounded border-2 border-black/10 bg-white p-6">
        <Link
          href="/"
          className="mb-6 inline-block font-helvetica text-sm font-bold underline"
        >
          ← Back home
        </Link>

        {pageLoading ? (
          <p className="text-center font-helvetica font-bold">Loading…</p>
        ) : loggedIn ? (
          <div className="text-center">
            {justLoggedIn && (
              <p className="mb-4 rounded border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
                Successfully signed in with Google.
              </p>
            )}
            <h1 className="mb-2 font-helvetica text-2xl font-bold">
              Welcome back
            </h1>
            <p className="mb-6 text-sm">
              Logged in as <span className="font-bold">{userEmail}</span>
            </p>
            <div className="flex flex-col gap-3">
              {currentApplication ? (
                <Link href="/apply/status" className={buttonClass}>
                  View application status
                </Link>
              ) : (
                <Link href="/apply" className={buttonClass}>
                  Apply now
                </Link>
              )}
              <button onClick={handleLogout} className={buttonClass}>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="mb-2 font-helvetica text-2xl font-bold">Login</h1>
            <p className="mb-6 text-sm text-black/70">
              Sign in to start or continue your application.
            </p>

            {error && (
              <p className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className={buttonClass}
            >
              {googleLoading ? "Redirecting to Google…" : "Sign in with Google"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
