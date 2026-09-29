// app/apply/status/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import { Application, ShortUser, Status } from "@/types/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const buttonClass =
  "rounded border-2 border-black px-4 py-2 text-center font-helvetica font-bold transition-colors hover:bg-black hover:text-white disabled:opacity-50 disabled:pointer-events-none";

const STATUS_CONFIG: Record<
  string,
  { color: string; title: string; message: string }
> = {
  accepted: {
    color: "bg-green-600",
    title: "Application Accepted!",
    message:
      "Congratulations! Your application has been accepted. Please confirm below if you'll be attending.",
  },
  pending: {
    color: "bg-yellow-600",
    title: "Application Under Review",
    message:
      "Your application is currently being reviewed. We'll notify you once a decision has been made — come back here if you're accepted to confirm attendance.",
  },
  waitlisted: {
    color: "bg-orange-600",
    title: "Application Waitlisted",
    message:
      "You've been placed on our waitlist. We'll reach out if a spot opens up.",
  },
  rejected: {
    color: "bg-red-600",
    title: "Application Not Accepted",
    message:
      "Unfortunately your application wasn't accepted this time. Thank you for your interest.",
  },
  confirmed: {
    color: "bg-blue-600",
    title: "Attendance Confirmed",
    message:
      "Your attendance is confirmed. You'll get more details from contact@bostonhacks.org closer to the event.",
  },
  declined: {
    color: "bg-gray-600",
    title: "Attendance Declined",
    message: "You've declined your invitation. Thanks for letting us know.",
  },
};

function StatusPage() {
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [user, setUser] = useState<ShortUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const userRes = await fetch(`${API_BASE}/user/me`, {
          credentials: "include",
        });
        if (!userRes.ok) {
          router.replace("/login");
          return;
        }
        const userData: ShortUser = await userRes.json();
        setUser(userData);

        const appRes = await fetch(
          `${API_BASE}/application/user?user_id=${userData.id}`,
          { credentials: "include" },
        );
        if (!appRes.ok)
          throw new Error("There was an error loading your application.");

        const applications: Application[] = await appRes.json();
        const currentYear = new Date().getFullYear();
        const currentApp = applications.find(
          (a) => a.applicationYear === currentYear,
        );

        if (!currentApp) {
          router.replace("/apply");
          return;
        }

        setApplication(currentApp);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const handleStatusUpdate = async (
    newStatus: Status.CONFIRMED | Status.DECLINED,
  ) => {
    if (!application) return;
    setActionLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/application/${application.id}/confirmdeny`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (!res.ok)
        throw new Error(
          "There was an error updating your status. Please try again or contact us.",
        );

      const result = await res.json();
      if (result?.application?.status !== newStatus)
        throw new Error(
          "Failed to update status correctly. Please refresh or contact us.",
        );

      setApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  const config = application
    ? STATUS_CONFIG[application.status.toLowerCase()] || {
        color: "bg-gray-600",
        title: "Application Status Unknown",
        message: "We can't determine your application status right now.",
      }
    : null;
  const isAccepted = application?.status.toLowerCase() === "accepted";

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center bg-white px-6 py-12 font-akshar text-black">
      <GridBackground />

      <div className="relative w-full max-w-md scale-[1.4] rounded border-2 border-black/10 bg-white p-6">
        <Link
          href="/"
          className="mb-6 inline-block font-helvetica text-sm font-bold underline"
        >
          ← Back home
        </Link>

        {error && (
          <p className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}{" "}
            <a href="mailto:contact@bostonhacks.org" className="underline">
              contact@bostonhacks.org
            </a>
          </p>
        )}

        {loading ? (
          <p className="text-center font-helvetica font-bold">
            Loading your application status…
          </p>
        ) : application && config ? (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <span
                className={`inline-block h-3 w-3 rounded-full ${config.color}`}
              />
            </div>
            <h1 className="mb-2 font-helvetica text-2xl font-bold">
              {config.title}
            </h1>
            {user?.email && (
              <p className="mb-4 text-xs text-black/60">{user.email}</p>
            )}
            <p className="mb-6 text-sm text-black/80">{config.message}</p>

            {isAccepted && (
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold">
                  Please confirm your attendance:
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    className={buttonClass}
                    disabled={actionLoading}
                    onClick={() => handleStatusUpdate(Status.CONFIRMED)}
                  >
                    Confirm
                  </button>
                  <button
                    className={buttonClass}
                    disabled={actionLoading}
                    onClick={() => handleStatusUpdate(Status.DECLINED)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-sm">No application found.</p>
        )}
      </div>
    </section>
  );
}

export default StatusPage;
