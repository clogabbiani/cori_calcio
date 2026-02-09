import { getLeagueBySlug } from "@/data/leagues";
import { notFound } from "next/navigation";
import TeamCard from "@/components/TeamCard";
import { Trophy } from "lucide-react";

export default async function LeaguePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const league = await getLeagueBySlug(slug);

  if (!league) notFound();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Trophy className="text-amber-500" size={32} />
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">{league.name}</h1>
            <p className="text-white/50">{league.country.name}</p>
          </div>
        </div>
      </header>

      <section className="space-y-8">
        <h2 className="text-xl font-bold text-white/60 uppercase tracking-widest italic border-b border-white/10 pb-4">
          Teams in this League
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {league.teams.map((team) => (
            <TeamCard key={team.id} team={{...team, league: {name: league.name}}} />
          ))}
        </div>
      </section>
    </div>
  );
}
