import Link from "next/link";
import { Music } from "lucide-react";

interface TeamCardProps {
  team: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    primaryColor: string | null;
    league: { name: string };
  };
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      href={`/team/${team.slug}`}
      className="group stadium-card block"
    >
      <div
        className="h-24 opacity-50 transition-opacity group-hover:opacity-70"
        style={{ backgroundColor: team.primaryColor || "#1ed760" }}
      ></div>
      <div className="p-6 -mt-12 flex items-start gap-4">
        <div className="w-20 h-20 bg-black rounded-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 transition-transform">
          {team.logoUrl ? (
            <img src={team.logoUrl} alt={team.name} className="w-16 h-16 object-contain" />
          ) : (
            <Music size={32} className="text-white/20" />
          )}
        </div>
        <div className="pt-12">
          <h3 className="text-xl font-bold tracking-tight">{team.name}</h3>
          <p className="text-sm text-white/50">{team.league.name}</p>
        </div>
      </div>
    </Link>
  );
}
