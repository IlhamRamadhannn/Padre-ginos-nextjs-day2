import type { Metadata } from "next";
import Header from "@/components/Header";
import FailureToggle from "@/components/FailureToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Padre Gino's — Menu Explorer",
  description: "Find your next favorite pizza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
