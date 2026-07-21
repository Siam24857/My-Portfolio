import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";

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

  title: "Sheikh Siam | Frontend Developer & UI Engineer",
  description:
    "Sheikh Siam is a frontend developer building modern, responsive, and interactive web experiences with React, Next.js, JavaScript, and modern UI technologies. Explore projects, skills, and the development journey.",

  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "UI Engineer",
    "Portfolio",
    "Web Developer",
    "Sheikh Siam",
    "Bangladesh Developer",
  ],

  authors: [{ name: "Sheikh Siam" }],
  creator: "Sheikh Siam",

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "Sheikh Siam | Frontend Developer & UI Engineer",
    description:
      "Building modern, responsive, and interactive web experiences with React, Next.js, and modern UI technologies.",
    url: "https://porfolioin1597.vercel.app/",
    siteName: "Sheikh Siam Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sheikh Siam — Frontend Developer Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sheikh Siam | Frontend Developer & UI Engineer",
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

  verification: {
    google: "verification-token",
  },

  category: "technology",
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full flex flex-col bg-dark-bg text-white">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
