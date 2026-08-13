import "./globals.css";
import { Inter, JetBrains_Mono, Syne, Space_Grotesk } from "next/font/google";
import AppProviders from "@/components/AppProviders";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "700"],
});

export const metadata = {
  metadataBase: new URL("https://porfolioin1597.vercel.app/"),
  title: {
    default: "Sheikh Siam | Full-Stack Developer",
    template: "%s | Sheikh Siam",
  },
  description:
    "Full-Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Building exceptional digital experiences.",
  keywords: [
    "Full-Stack Developer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "UI Engineer",
    "Portfolio",
    "Web Developer",
    "Sheikh Siam",
    "Three.js",
    "WebGL",
  ],
  authors: [{ name: "Sheikh Siam" }],
  creator: "Sheikh Siam",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Sheikh Siam | Full-Stack Developer",
    description:
      "Building modern, responsive, and interactive web experiences with React, Next.js, and modern UI technologies.",
    url: "https://porfolioin1597.vercel.app/",
    siteName: "Sheikh Siam Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sheikh Siam — Full-Stack Developer Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheikh Siam | Full-Stack Developer",
    description:
      "Building modern, responsive, and interactive web experiences with React, Next.js, and modern UI technologies.",
    images: ["/opengraph-image.png"],
    creator: "@sheikhsiam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${jetbrainsMono.variable} ${syne.variable} ${spaceGrotesk.variable}`}
      style={{ cursor: 'none' }}
    >
      <body
        className="min-h-full flex flex-col bg-void text-text overflow-x-hidden"
        style={{ cursor: 'none' }}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
