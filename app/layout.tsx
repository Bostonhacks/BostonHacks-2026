import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bostonhacks.org"),
  title: "BostonHacks 2026 - Boston Bound",
  description:
    "BostonHacks 2026 Hackathon, Boston University’s largest, annual student-run hackathon and various beginner friendly workshops!",
  keywords: [
    "bostonhacks",
    "hackathon",
    "boston university",
    "boston hackathon",
    "boston hackathons 2026",
    "bu hackathon",
    "student hackathon",
    "coding competition",
    "tech event",
    "programming",
    "boston",
    "boston bound",
    "2026",
  ],
  authors: [
    {
      name: "BostonHacks Team",
    },
  ],
  creator: "BostonHacks",
  openGraph: {
    title: "BostonHacks 2026 - MBTA + Boston",
    description: "BostonHacks 2026 Hackathon landing page",
    url: "https://bostonhacks.org",
    siteName: "BostonHacks 2026",
    locale: "en_US",
    type: "website",
    /*
    images: [
      {
        url: import_flyer,
        alt: import_banner,
      }
    ]
      */
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* relative + overflow-x-clip: becomes the containing block for absolutely-
            positioned decorative graphics and clips their horizontal overflow, without
            creating a scroll container on the root — so position: sticky keeps working. */}
        <div className="relative overflow-x-clip">{children}</div>
      </body>
    </html>
  );
}
