"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQ = searchParams.get("q") ?? "";

  const [value, setValue] = useState(urlQ);

  useEffect(() => {
    const q = value.trim();
    if (q === urlQ) return;

    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) params.set("q", q);
      else params.delete("q");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 250);

    return () => clearTimeout(t);
  }, [value, urlQ, pathname, router, searchParams]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10">
      <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
        Zoek op naam of locatie
      </label>
      <div className="mt-2 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="bijv. Rotterdam, tacos..."
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/20 focus:bg-black/40"
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
          >
            Wis
          </button>
        )}
      </div>
    </div>
  );
}
