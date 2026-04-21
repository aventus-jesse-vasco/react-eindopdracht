import { notFound } from "next/navigation";
import Link from "next/link";
import { getSpotById } from "../../../lib/spotsRepo";
import { extractVideoId } from "../../../lib/tiktok";

export const runtime = "nodejs";

export default async function SpotDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const spotId = Number(id);
  if (!Number.isFinite(spotId)) notFound();

  const spot = getSpotById(spotId);
  if (!spot) notFound();

  const tiktokId = spot.tiktok_url ? extractVideoId(spot.tiktok_url) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            {spot.locatie}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            {spot.naam}
          </h1>
          <p className="mt-2 text-sm text-white/75">{spot.soort_eten}</p>
        </div>

        <Link
          href="/spots"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
        >
          Terug
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 ring-1 ring-white/10">
          <img
            src={spot.afbeelding_url}
            alt={spot.naam}
            className="h-72 w-full object-cover sm:h-96"
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-lg font-bold">Omschrijving</h2>
            <p className="mt-2 text-sm text-white/80">{spot.omschrijving}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-lg font-bold">Media</h2>
            <div className="mt-3">
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
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
                >
                  Open Google Maps
                </a>
              ) : (
                <p className="text-sm text-white/70">Geen media beschikbaar.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

