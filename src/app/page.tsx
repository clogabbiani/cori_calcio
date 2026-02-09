import { getFeaturedTeams } from "@/data/teams";
import TeamCard from "@/components/TeamCard";
import Link from "next/link";
import { Trophy, Globe, Flame } from "lucide-react";

export default async function Home() {
  const featuredTeams = await getFeaturedTeams();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-green-900/20 blur-3xl rounded-full -top-20 -left-20 w-96 h-96"></div>
        <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            THE SOUND OF THE <span className="text-green-500 underline decoration-green-500/30 underline-offset-8">STADIUM</span>
          </h1>
          <p className="text-xl text-white/60">
            Listen to the most legendary chants and anthems from football clubs around the globe.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/search" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
              Find Your Team
            </Link>
            <Link href="/leagues" className="bg-white/10 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
              Browse Leagues
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flame className="text-orange-500" />
            <h2 className="text-2xl font-bold italic tracking-tight uppercase">Trending Teams</h2>
          </div>
          <Link href="/search" className="text-sm font-bold text-green-500 hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <Link href="/leagues" className="group relative h-64 overflow-hidden rounded-2xl stadium-card flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <div className="relative z-20 text-center space-y-2">
            <Trophy size={48} className="mx-auto text-amber-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black italic">TOP LEAGUES</h3>
            <p className="text-white/60">Premier League, La Liga, Serie A & more</p>
          </div>
        </Link>
        <Link href="/countries" className="group relative h-64 overflow-hidden rounded-2xl stadium-card flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <div className="relative z-20 text-center space-y-2">
            <Globe size={48} className="mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black italic">BY COUNTRY</h3>
            <p className="text-white/60">Discover anthems by nation</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
