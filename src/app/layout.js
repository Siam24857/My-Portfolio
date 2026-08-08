import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import AppProviders from "@/components/AppProviders";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata = {
  metadataBase: new URL("https://porfolioin1597.vercel.app/"),

  title: "Sheikh Siam | Full-Stack Developer",
  description:
    "Sheikh Siam is a full-stack developer building scalable web applications with modern technologies. Specializing in React, Next.js, Node.js, Express, and cloud deployment.",

  keywords: [
    "Full-Stack Developer", "React", "Next.js", "Node.js", "Express",
    "TypeScript", "JavaScript", "Tailwind CSS", "MongoDB", "Firebase",
    "Docker", "Git", "Web Developer", "Portfolio", "Sheikh Siam",
    "Bangladesh Developer", "Scalable Applications",
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
    description: "Building scalable web applications with modern technologies. Specializing in React, Next.js, Node.js, and cloud deployment.",
    url: "https://porfolioin1597.vercel.app/",
    siteName: "Sheikh Siam Portfolio",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Sheikh Siam — Full-Stack Developer Portfolio" }],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sheikh Siam | Full-Stack Developer",
    description: "Building scalable web applications with modern technologies. Specializing in React, Next.js, Node.js, and cloud deployment.",
    images: ["/opengraph-image.png"],
    creator: "@sheikhsiam",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },

  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full flex flex-col bg-ink-900 text-white overflow-x-hidden">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
