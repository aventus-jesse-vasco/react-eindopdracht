import Link from "next/link";

const linkClass =
  "text-sm font-medium text-white/80 hover:text-white transition-colors";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
            <span className="text-xs font-black tracking-wide text-white/90">
              SF
            </span>
          </span>
          <span className="text-sm font-semibold tracking-wide text-white">
            StreetfoodSpotter
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/spots" className={linkClass}>
            Spots
          </Link>
          <Link
            href="/add-spot"
            className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Add spot
          </Link>
        </nav>
      </div>
    </header>
  );
}

