import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://porfolioin1597.vercel.app/"),

  title: "Sheikh Siam | Frontend Developer",
  description:
    "Sheikh Siam is a frontend developer building modern, responsive, and interactive web experiences with React, Next.js, JavaScript, and modern UI technologies.",

  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "UI Engineer",
    "Portfolio",
  ],

  authors: [{ name: "Sheikh Siam" }],
  creator: "Sheikh Siam",

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "Sheikh Siam | Frontend Developer",
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
  },

  twitter: {
    card: "summary_large_image",
    title: "Sheikh Siam | Frontend Developer",
    description:
      "Building modern, responsive, and interactive web experiences with React, Next.js, and modern UI technologies.",
    images: ["/opengraph-image.png"],
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-dark-bg text-white">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}


