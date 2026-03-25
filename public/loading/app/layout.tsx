import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anas Masama | Software Engineer",
  description: "Anas Masama — Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
