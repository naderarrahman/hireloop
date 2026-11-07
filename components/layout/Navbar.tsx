"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo/logo.png"
                alt="HireLoop Logo"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <div className="h-4 w-px bg-zinc-700" /> {/* Divider */}
            <Link
              href="/register"
              className="bg-[#5A45FF] hover:bg-[#4a36ee] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-400 hover:text-white p-2">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-zinc-800 shadow-xl">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-zinc-800 my-2 pt-4">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 block w-full text-center px-3 py-3 rounded-md text-base font-medium text-white bg-[#5A45FF] hover:bg-[#4a36ee]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}