import type { Metadata } from "next";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PageIntro } from "@/components/motion/page-intro";
import { RouteTransition } from "@/components/motion/route-transition";
import {
  companyStatement,
  contactEmail,
  missionStatement
} from "@/lib/content";

const AskFeepostAssistant = dynamic(
  () =>
    import("@/components/assistant/ask-feepost-assistant").then(
      (mod) => mod.AskFeepostAssistant
    ),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/motion/custom-cursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);
const SiteBackground = dynamic(
  () => import("@/components/graphics/site-background").then((mod) => mod.SiteBackground),
  { ssr: false }
);
const SmoothScroll = dynamic(
  () => import("@/components/motion/smooth-scroll").then((mod) => mod.SmoothScroll),
  { ssr: false }
);
const SoundControl = dynamic(
  () => import("@/components/experience/sound-control").then((mod) => mod.SoundControl),
  { ssr: false }
);

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

const siteTitle = "Feepost Software & Development Corporation";
const siteDescription =
  "Veteran-owned technology firm delivering scalable software engineering, systems development and digital infrastructure solutions for government and enterprise missions.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL("https://www.feepostsoftware.com"),
  applicationName: siteTitle,
  keywords: [
    "Feepost",
    "software engineering",
    "systems development",
    "digital infrastructure",
    "government IT",
    "enterprise modernization",
    "veteran-owned"
  ],
  authors: [{ name: siteTitle }],
  creator: siteTitle,
  publisher: siteTitle,
  category: "Technology",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
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
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteTitle,
    description: companyStatement,
    email: contactEmail,
    url: "https://www.feepostsoftware.com",
    logo: "https://www.feepostsoftware.com/logo.png",
    ownershipFundingInfo: "Veteran-owned",
    slogan: missionStatement
  };

  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-background font-body text-copy antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="site-shell">
          <SmoothScroll />
          <CustomCursor />
          <SiteBackground />
          <SoundControl />
          <div className="site-content">
            <PageIntro />
            <RouteTransition>{children}</RouteTransition>
          </div>
          <AskFeepostAssistant />
        </div>
      </body>
    </html>
  );
}
