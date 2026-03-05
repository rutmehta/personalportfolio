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
  metadataBase: new URL("https://rutmehta.com"),
  title: {
    default: "Rut Mehta",
    template: "%s | Rut Mehta",
  },
  description: "Founder, engineer, researcher. Building for humanity. AI at Endex.ai.",
  openGraph: {
    title: "Rut Mehta",
    description: "Founder, engineer, researcher. Building for humanity. AI at Endex.ai.",
    type: "website",
    siteName: "Rut Mehta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rut Mehta",
    description: "Founder, engineer, researcher. Building for humanity. AI at Endex.ai.",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Navbar />
        <CommandPalette />
        <div id="main-content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
