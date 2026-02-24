import { Suspense } from "react";
import { SearchBar } from "./SearchBar";
import { SpotsGrid } from "./SpotsGrid";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function GridFallback() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="h-[420px] animate-pulse rounded-3xl border border-white/10 bg-white/5"
        />
      ))}
    </div>
  );
}

export default function SpotsPage({
  searchParams
}: {
  searchParams?: { q?: string };
}) {
  const q = searchParams?.q ?? "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Spots</h1>
        <p className="mt-2 text-sm text-white/75">
          Zoek op naam of locatie. Klik op een card voor de detailpagina.
        </p>
      </div>

      <SearchBar />

      <Suspense key={q} fallback={<GridFallback />}>
        <SpotsGrid q={q} />
      </Suspense>
    </div>
  );
}

