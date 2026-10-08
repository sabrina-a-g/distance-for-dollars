"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "How it Works", href: "#" },
  { label: "Goals", href: "/goals" },
  { label: "Charities", href: "/charities" },
  { label: "Pricing", href: "#" },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/8">
      <div className="max-w-6xl mx-auto px-5 lg:px-10 h-16 grid grid-cols-3 items-center gap-8">
      <Link href="/" className="flex items-center gap-2 justify-self-start">
        <span className="w-7 h-7 rounded-full bg-[#56721c] flex items-center justify-center">
         <span className="text-[#B4C78E] text-[10px] font-bold font-mono-data">DFD</span>
        </span>
        <span className="font-display font-600 text-base tracking-tight text-[#56721c]">DistanceForDollars</span>
      </Link>
      <div className="hidden md:flex items-center gap-6 justify-self-center">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              pathname === link.href ? "text-[#56721c] border-b-2 border-[#FFBF00] pb-0.5" : "text-[#3d3d38] hover:text-[#56721c]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
        <div className="flex items-center gap-2 justify-self-end">
          <Link href="#" className="hidden md:block text-sm font-medium text-[#3d3d38] hover:text-[#56721c] px-3 py-2 transition-colors">
            Log in
          </Link>
          <Link href="#" className="bg-[#56721c] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#698C22] transition-colors">
            Start going the distance
          </Link>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="block w-5 h-0.5 bg-[#1a1a18] mb-1"></span>
            <span className="block w-5 h-0.5 bg-[#1a1a18] mb-1"></span>
            <span className="block w-5 h-0.5 bg-[#1a1a18]"></span>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-black/8 px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="text-sm text-[#3d3d38] font-medium py-1">
              {link.label}
            </Link>
          ))}
            <Link href="#" className="text-sm text-[#3d3d38] font-medium py-1">Log in</Link>
        </div>
      )}
    </nav>
  );
}