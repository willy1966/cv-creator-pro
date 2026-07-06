import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "CV Creator Pro — Create a professional resume in minutes",
  description:
    "No design skills required. Enter your information, choose a beautiful ATS-friendly template, and download a polished PDF resume.",
  openGraph: {
    title: "CV Creator Pro",
    description: "Create a professional, ATS-friendly resume in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
