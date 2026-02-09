import { searchTeams } from "@/data/teams";
import TeamCard from "@/components/TeamCard";
import { Search as SearchIcon } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = await searchParams;
  const teams = q ? await searchTeams(q) : [];

  return (
    <div className="space-y-12">
      <header className="space-y-6 max-w-2xl">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Search Teams</h1>
        <form action="/search" className="relative group">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-green-500 transition-colors" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search by team, league or country..."
            className="w-full bg-[#111] border border-white/10 rounded-2xl py-6 pl-16 pr-6 focus:outline-none focus:border-green-500/50 transition-all text-xl"
            autoFocus
          />
        </form>
      </header>

      {q ? (
        <section className="space-y-8">
          <h2 className="text-xl font-bold text-white/60 uppercase tracking-widest italic">
            Results for "{q}" ({teams.length})
          </h2>

          {teams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-white/5 rounded-3xl">
              <SearchIcon size={48} className="mx-auto text-white/10" />
              <p className="text-xl text-white/40 font-bold">No teams found matching your search.</p>
            </div>
          )}
        </section>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-white/40">Enter a team name to start your discovery.</p>
        </div>
      )}
    </div>
  );
}
