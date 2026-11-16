"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const categories = [
  { label: "Engineering", value: "engineering", count: "1.2k" },
  { label: "Design", value: "design", count: "432" },
  { label: "Marketing", value: "marketing", count: "156" },
  { label: "Sales", value: "sales", count: "89" },
];

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategories = searchParams.get("category")?.split(",").filter(Boolean) || [];

  const handleCheckboxChange = (value: string) => {
    let newCategories;

    if (currentCategories.includes(value)) {
      newCategories = currentCategories.filter((cat) => cat !== value);
    } else {
      newCategories = [...currentCategories, value];
    }

    const params = new URLSearchParams(searchParams.toString());

    if (newCategories.length > 0) {
      params.set("category", newCategories.join(","));
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#141414] border border-zinc-800 rounded-xl p-5">
      <h2 className="text-lg font-bold text-white mb-6">Filters</h2>
      
      <div>
        <h3 className="text-sm font-semibold text-zinc-300 mb-4">Job Category</h3>
        <div className="space-y-3">
          {categories.map((cat) => {
            const isChecked = currentCategories.includes(cat.value);
            return (
              <label
                key={cat.value}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded bg-[#0a0a0a] border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                    <input
                      type="checkbox"
                      value={cat.value}
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(cat.value)}
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    {isChecked && (
                      <svg className="w-3.5 h-3.5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                    {cat.label}
                  </span>
                </div>
                <span className="text-xs text-zinc-500">{cat.count}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}