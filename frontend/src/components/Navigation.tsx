'use client';

import Link from 'next/link';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

export default function Navigation() {
  const { t } = useTranslation();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
      <div className="container mx-auto px-4 sm:px-10 lg:px-20">
        <div className="flex items-center justify-between whitespace-nowrap py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-6 text-[#FFFF00]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_535)">
                  <path 
                    clipRule="evenodd" 
                    d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" 
                    fill="currentColor" 
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_535">
                    <rect fill="white" height="48" width="48" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#F5F5F5] text-lg font-bold leading-tight tracking-tight">Kungpao</h2>
          </Link>
          
          <div className="flex flex-1 justify-end gap-4 items-center">
            <div className="hidden md:flex items-center gap-9">
              <Link href="/" className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFFF00] transition-colors">
                {t.navigation.home}
              </Link>
              <Link href="/songs" className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFFF00] transition-colors">
                {t.navigation.songs}
              </Link>
              <Link href="/events" className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFFF00] transition-colors">
                {t.navigation.events}
              </Link>
              <Link href="/gallery" className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFFF00] transition-colors">
                {t.navigation.gallery}
              </Link>
              <Link href="/about" className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFFF00] transition-colors">
                {t.navigation.about}
              </Link>
              <Link href="/contact" className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFFF00] transition-colors">
                {t.navigation.contact}
              </Link>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
