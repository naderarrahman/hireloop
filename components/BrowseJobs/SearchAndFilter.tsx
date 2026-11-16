"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchAndFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          name="search"
          defaultValue={searchParams.get("search") || ""}
          placeholder="Search by job title, keywords..."
          className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#5A45FF] transition-colors"
        />
      </div>

      <button
        type="submit"
        className="bg-white hover:bg-zinc-200 text-black px-8 py-3 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
      >
        Search Jobs
      </button>
    </form>
  );
}