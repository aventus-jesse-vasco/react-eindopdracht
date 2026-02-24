import Link from "next/link";
import { extractVideoId } from "../../lib/tiktok";
import type { Spot } from "../../lib/spotsRepo";

export function SpotCard({ spot }: { spot: Spot }) {
  const tiktokId = spot.tiktok_url ? extractVideoId(spot.tiktok_url) : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 ring-1 ring-white/10 transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
      <div className="relative">
        <img
          src={spot.afbeelding_url}
          alt={spot.naam}
          loading="lazy"
          className="h-44 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-lg font-bold leading-tight text-white">
            {spot.naam}
          </div>
          <div className="mt-0.5 text-sm text-white/80">{spot.locatie}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="text-sm text-white/70 line-clamp-2">
          {spot.omschrijving}
        </div>

        <div className="mt-auto">
          {tiktokId ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <iframe
                src={`https://www.tiktok.com/embed/${tiktokId}`}
                className="w-full aspect-[9/16]"
                allow="autoplay; encrypted-media"
              />
            </div>
          ) : spot.google_maps_url ? (
            <a
              href={spot.google_maps_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm font-semibold text-white/90 hover:bg-black/30 transition-colors"
            >
              Bekijk op Google Maps
            </a>
          ) : (
            <p className="text-sm text-white/60">Geen media beschikbaar</p>
          )}
        </div>

        <Link
          href={`/spots/${spot.id}`}
          className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
        >
          Meer info
        </Link>
      </div>
    </article>
  );
}

