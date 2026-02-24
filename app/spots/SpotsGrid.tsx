import { listSpots } from "../../lib/spotsRepo";
import { SpotCard } from "./SpotCard";

export async function SpotsGrid({ q }: { q?: string | null }) {
  const spots = listSpots({ q });

  if (spots.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
        Geen spots gevonden. Probeer een andere zoekterm.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
}

