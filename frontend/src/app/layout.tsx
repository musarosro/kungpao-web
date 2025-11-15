import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Be_Vietnam_Pro } from 'next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

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
      <body className={`${beVietnamPro.className} bg-[#000000] text-[#F5F5F5] antialiased`}>
        <LanguageProvider>
          <Navigation />
          <main>
            {children}
          </main>
          <footer className="bg-[#111111] border-t border-neutral-800 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-[#A0A0A0]">&copy; {new Date().getFullYear()} Kung Pao. All rights reserved.</p>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
