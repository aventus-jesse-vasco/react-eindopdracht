import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./components/NavBar";

export const metadata: Metadata = {
  title: "StreetfoodSpotter",
  description: "Bekijk, zoek en voeg streetfoodspots toe."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="min-h-dvh text-white antialiased">
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}

