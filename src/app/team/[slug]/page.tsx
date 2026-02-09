import { getTeamBySlug } from "@/data/teams";
import { notFound } from "next/navigation";
import { Music, MapPin, Trophy, Play } from "lucide-react";
import SongPlayer from "@/components/SongPlayer";

export default async function TeamPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const team = await getTeamBySlug(slug);

  if (!team) notFound();

  const primaryColor = team.primaryColor || "#1ed760";

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Team Header */}
      <header className="relative rounded-3xl overflow-hidden border border-white/10">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="w-40 h-40 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center p-6 shadow-2xl">
            {team.logoUrl ? (
              <img src={team.logoUrl} alt={team.name} className="w-32 h-32 object-contain" />
            ) : (
              <Music size={64} className="text-white/20" />
            )}
          </div>

          <div className="text-center md:text-left space-y-4 flex-1">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Trophy size={12} className="text-amber-500" />
                {team.league.name}
              </span>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <MapPin size={12} className="text-blue-500" />
                {team.country.name}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">{team.name}</h1>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Songs List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Music className="text-green-500" />
            <h2 className="text-2xl font-bold uppercase italic">Songs & Anthems</h2>
          </div>

          {team.songs.length > 0 ? (
            <div className="grid gap-4">
              {team.songs.map((song) => (
                <SongPlayer key={song.id} song={song} teamColor={primaryColor} />
              ))}
            </div>
          ) : (
            <div className="bg-white/5 rounded-2xl p-12 text-center space-y-4">
              <Music size={48} className="mx-auto text-white/10" />
              <p className="text-white/50">No songs found for this team yet.</p>
              <button className="text-green-500 font-bold hover:underline">Submit a song</button>
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
          <div className="stadium-card p-6 space-y-6">
            <h3 className="font-bold text-lg uppercase italic border-b border-white/10 pb-2">About the Club</h3>
            <div className="space-y-4 text-sm text-white/60">
              <p>Founded: N/A</p>
              <p>Stadium: N/A</p>
              <p>Explore the sounds of {team.name} fans. From the curva to the main stand, hear what makes the stadium shake.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
