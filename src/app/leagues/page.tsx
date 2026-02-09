import { getLeagues } from "@/data/leagues";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default async function LeaguesPage() {
  const leagues = await getLeagues();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Trophy className="text-amber-500" size={32} />
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Browse Leagues</h1>
        </div>
        <p className="text-white/50 max-w-xl">Explore anthems from the top competitions in the world.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues.map((league) => (
          <Link
            key={league.id}
            href={`/league/${league.slug}`}
            className="stadium-card p-8 group hover:scale-[1.02] transition-transform"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:border-amber-500/50 transition-colors">
                <Trophy className="text-amber-500" size={32} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/30">{league.country.name}</span>
            </div>
            <h3 className="text-2xl font-black italic uppercase mb-2">{league.name}</h3>
            <p className="text-sm text-white/40">{league._count.teams} Teams with anthems</p>
          </Link>
        ))}
      </div>

      {leagues.length === 0 && (
        <div className="py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-white/40 font-bold uppercase tracking-widest">No leagues added yet.</p>
        </div>
      )}
    </div>
  );
}
