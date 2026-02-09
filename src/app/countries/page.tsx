import { getCountries } from "@/data/countries";
import Link from "next/link";
import { Globe } from "lucide-react";

export default async function CountriesPage() {
  const countries = await getCountries();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Globe className="text-blue-500" size={32} />
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Browse by Country</h1>
        </div>
        <p className="text-white/50 max-w-xl">Find teams and anthems from every corner of the world.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country) => (
          <Link
            key={country.id}
            href={`/country/${country.slug}`}
            className="stadium-card p-8 group hover:scale-[1.02] transition-transform"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:border-blue-500/50 transition-colors">
                <Globe className="text-blue-500" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-black italic uppercase mb-2">{country.name}</h3>
            <p className="text-sm text-white/40">{country._count.teams} Teams with anthems</p>
          </Link>
        ))}
      </div>

      {countries.length === 0 && (
        <div className="py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-white/40 font-bold uppercase tracking-widest">No countries added yet.</p>
        </div>
      )}
    </div>
  );
}
