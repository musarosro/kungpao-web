import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Kung Pao - Official Band Website",
  description: "Official website of Kung Pao - Chinese Folk Rock from Prague",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Be_Vietnam_Pro',sans-serif] bg-[#000000] text-[#F5F5F5] antialiased">
        <Navigation />
        <main>
          {children}
        </main>
        <footer className="bg-[#111111] border-t border-neutral-800 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[#A0A0A0]">&copy; {new Date().getFullYear()} Kung Pao. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
