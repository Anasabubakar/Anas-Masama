"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <main
        className={`min-h-screen overflow-y-auto bg-white transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <nav className="flex items-center justify-between px-10 py-6 text-sm text-gray-400">
          <div className="flex gap-6">
            <span className="font-medium text-black">/home</span>
            <span>/me</span>
            <span>/fragments</span>
            <span>/visitors</span>
            <span>/résumé 🔒</span>
            <span>/contact</span>
          </div>
          <div className="flex gap-4">
            <span>𝕏</span><span>in</span><span>Bē</span>
          </div>
        </nav>

        <section className="px-10 pt-16">
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-black">
            Anas Masama turns difficult problems into delightful solutions —
            and builds software experiences you might accidentally spend hours on.
          </h1>
          <p className="mt-6 text-sm text-gray-400">
            Clients:{" "}
            <span className="text-black">
              HoneyCoin, Piggyvest, HorusLabs, Azza, Partyverse.
            </span>
          </p>
        </section>
      </main>
    </>
  );
}
