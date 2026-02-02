export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Mikalyzed Auto Boutique
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Buying, selling, consigning, and storing high-end vehicles with a
          premium, concierge-level experience.
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="/inventory"
            className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
          >
            View Inventory
          </a>

          <a
            href="/sell-your-car"
            className="px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Sell Your Car
          </a>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 pb-32 max-w-6xl mx-auto">
        <div className="border border-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Buy</h3>
          <p className="text-gray-400">
            Curated inventory of exotic, classic, and specialty vehicles.
          </p>
        </div>

        <div className="border border-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Sell & Consign</h3>
          <p className="text-gray-400">
            Transparent, market-driven selling with maximum exposure.
          </p>
        </div>

        <div className="border border-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">The Reserve</h3>
          <p className="text-gray-400">
            Secure, climate-controlled storage for discerning collectors.
          </p>
        </div>
      </section>
    </main>
  );
}
