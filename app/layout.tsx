import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const recoleta = localFont({
  src: [
    {
      path: "../public/fonts/recoleta-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/recoleta-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/recoleta-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-recoleta",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "HuntFlow - Hunt Application & Deadline Manager",
  description:
    "The ultimate hunting application and draw deadline manager for serious North American big-game hunters. Never miss a deadline again.",
  keywords: [
    "hunting",
    "draw",
    "application",
    "deadline",
    "preference points",
    "bonus points",
    "big game",
    "elk",
    "deer",
    "antelope",
  ],
  authors: [{ name: "HuntFlow" }],
  creator: "HuntFlow",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "HuntFlow - Hunt Application & Deadline Manager",
    description: "Never miss a hunting application deadline again.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HuntFlow - Hunt Application & Deadline Manager",
    description: "Never miss a hunting application deadline again.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${recoleta.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
