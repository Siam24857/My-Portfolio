import "./globals.css";

export const metadata = {
  title: "Jensen Omega | Software Developer Portfolio",
  description: "Jensen Omega is a software developer specializing in web and app development.",
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



