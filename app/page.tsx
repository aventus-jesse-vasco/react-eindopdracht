import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 ring-1 ring-white/10 sm:p-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_50%)]" />

      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
          StreetfoodSpotter
        </p>
        <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight sm:text-5xl">
          Vind de beste streetfoodspots in jouw stad.
        </h1>
        <p className="mt-4 text-pretty text-base text-white/80 sm:text-lg">
          Bekijk spots in een overzicht, zoek op naam of locatie, open TikTok
          previews of Google Maps, en voeg je eigen favorieten toe.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/spots"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Bekijk spots
          </Link>
          <Link
            href="/add-spot"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/10"
          >
            Voeg een spot toe
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Zoek slim",
            body: "Filter direct op naam of locatie."
          },
          {
            title: "Bekijk media",
            body: "TikTok preview of Maps-link per spot."
          },
          {
            title: "Voeg toe",
            body: "Maak je eigen lijst met nieuwe spots."
          }
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="text-sm font-semibold">{card.title}</div>
            <div className="mt-1 text-sm text-white/70">{card.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

