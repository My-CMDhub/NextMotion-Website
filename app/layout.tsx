import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolarSaver — Maximize Your Solar Savings with AI",
  description: "Upload your electricity bill and get AI-powered insights to stop wasting your solar energy. Join thousands of Australian homeowners saving more with SolarSaver.",
  keywords: ["solar savings", "electricity bill", "AI optimization", "solar energy", "Australia"],
  openGraph: {
    title: "SolarSaver — Maximize Your Solar Savings with AI",
    description: "Stop losing money to the grid. Get personalized insights to maximize your solar investment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

