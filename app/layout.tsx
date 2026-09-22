import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SpaceNet — Orbital Computing Platform",
  description:
    "Deploy your software on orbital computing infrastructure. Process spaceborne data closer to where it is generated, without building your own space infrastructure.",
  keywords: [
    "orbital computing",
    "space infrastructure",
    "GPU compute in space",
    "edge computing",
    "satellite data processing",
  ],
  openGraph: {
    title: "SpaceNet — Compute beyond Earth",
    description:
      "The orbital computing platform for the next generation of space applications.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#030509",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
