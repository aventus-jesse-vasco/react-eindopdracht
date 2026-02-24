export default function LoadingSpots() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-32 animate-pulse rounded-lg bg-white/10" />
        <div className="mt-3 h-4 w-72 animate-pulse rounded bg-white/10" />
      </div>

      <div className="h-14 animate-pulse rounded-2xl border border-white/10 bg-white/5" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div
            key={i}
            className="h-[420px] animate-pulse rounded-3xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}

