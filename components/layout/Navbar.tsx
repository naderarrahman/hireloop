"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Browse Jobs", href: "#" },
  { name: "Company", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function Navbar() {
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  
  const user = session?.user as { 
    name: string; 
    email: string; 
    image?: string; 
    role?: string;
  } | undefined;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname.startsWith("/dashboard")) return null;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const formatRole = (role?: string) => {
    if (!role) return "";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
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

          <div className="hidden md:flex items-center space-x-6">
            {isPending ? (
              <div className="h-9 w-24 bg-zinc-800 animate-pulse rounded-lg" />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full border border-zinc-700 object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-[#5A45FF] flex items-center justify-center text-white font-semibold text-sm">
                      {user.name?.charAt(0).toUpperCase() || <UserIcon className="w-4 h-4" />}
                    </div>
                  )}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-[#0c0c0f] border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50">
                    <div className="px-4 py-3 border-b border-zinc-800/80 mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        {user.role && (
                          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                            {formatRole(user.role)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                    </div>
                    
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <div className="h-4 w-px bg-zinc-700" />
                <Link
                  href="/sign-up"
                  className="bg-[#5A45FF] hover:bg-[#4a36ee] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-400 hover:text-white p-2">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

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
              {user ? (
                <>
                  <div className="px-3 py-2 mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      {user.role && (
                        <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                          {formatRole(user.role)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="mt-2 block w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-2 block w-full text-center px-3 py-3 rounded-md text-base font-medium text-white bg-[#5A45FF] hover:bg-[#4a36ee]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}