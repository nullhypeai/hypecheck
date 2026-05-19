import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hypecheck.nullhype.tech"),
  title: "HypeCheck - AI Startup Idea Validator",
  description:
    "Describe your startup idea in plain language. Get a Hype Score, competitor analysis, market sizing, and a Build or Don't Build verdict, powered by AI.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HypeCheck - AI Startup Idea Validator",
    description:
      "Open-source AI reality checks for startup ideas. Get a Hype Score, competitors, market sizing, risks, monetization signals, and a build-or-don't-build verdict.",
    url: "https://hypecheck.nullhype.tech",
    siteName: "HypeCheck",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "HypeCheck - AI Startup Idea Validator",
    description:
      "Open-source AI reality checks for startup ideas. Get 3 free reports, then buy one-time credits. No subscription.",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
