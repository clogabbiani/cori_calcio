import Link from "next/link";
import { auth } from "@/auth";
import { Music, Search, User, ShieldCheck } from "lucide-react";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <Music className="text-green-500" />
          <span>CORI <span className="text-green-500">CALCIO</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="/leagues" className="hover:text-white transition-colors">Leagues</Link>
          <Link href="/countries" className="hover:text-white transition-colors">Countries</Link>
          <Link href="/submit" className="hover:text-white transition-colors">Submit Song</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Search size={20} />
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              {(session.user as any)?.role === "ADMIN" && (
                <Link href="/admin" className="p-2 hover:bg-white/10 rounded-full transition-colors text-amber-500" title="Admin Dashboard">
                  <ShieldCheck size={20} />
                </Link>
              )}
              <Link href="/profile" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all">
                <User size={18} />
                <span className="hidden sm:inline text-sm">{session.user?.name || "Profile"}</span>
              </Link>
            </div>
          ) : (
            <Link href="/login" className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-green-600/20">
              Join Now
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
