import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PageIntro } from "@/components/motion/page-intro";

const displayFont = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800", "900"]
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Feepost Software & Development Corporation",
  description:
    "Veteran-owned software engineering, systems development, and digital infrastructure solutions for government and enterprise missions.",
  metadataBase: new URL("https://www.feepostsoftware.com"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    title: "Feepost Software & Development Corporation",
    description:
      "Veteran-owned software engineering, systems development, and digital infrastructure solutions for government and enterprise missions.",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 1024,
        alt: "Feepost Software logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Feepost Software & Development Corporation",
    description:
      "Veteran-owned software engineering, systems development, and digital infrastructure solutions for government and enterprise missions.",
    images: ["/logo.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-background font-body text-copy antialiased`}
      >
        <PageIntro />
        {children}
      </body>
    </html>
  );
}
