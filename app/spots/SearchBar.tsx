"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const q = value.trim();
      if (q) params.set("q", q);
      else params.delete("q");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 250);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, pathname, router]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10">
      <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
        Zoek op naam of locatie
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="bijv. Rotterdam, tacos..."
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/20 focus:bg-black/40"
      />
    </div>
  );
}

