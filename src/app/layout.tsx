import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rut Mehta",
  description: "Founder, engineer, researcher. Building for humanity.",
  openGraph: {
    title: "Rut Mehta",
    description: "Founder, engineer, researcher. Building for humanity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rut Mehta",
    description: "Founder, engineer, researcher. Building for humanity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white antialiased">
        <Navbar />
        <CommandPalette />
        {children}
        <Footer />
      </body>
    </html>
  );
}
