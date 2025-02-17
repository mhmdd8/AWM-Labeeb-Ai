import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { clsx } from "clsx"; // Import clsx instead of undefined cn
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWM",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "antialiased min-h-screen")}>
        {children}
      </body>
    </html>
  );
}
