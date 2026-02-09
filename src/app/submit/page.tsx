import { auth } from "@/auth";
import { getTeams } from "@/data/teams";
import { redirect } from "next/navigation";
import { Music } from "lucide-react";
import SubmitSongForm from "@/components/SubmitSongForm";

export default async function SubmitPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const teams = await getTeams();

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <header className="space-y-4 text-center">
        <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <Music className="text-green-500" size={40} />
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Submit a Song</h1>
        <p className="text-white/50">Found a missing anthem or a better version? Share it with the community. All submissions are reviewed by admins before publishing.</p>
      </header>

      <SubmitSongForm teams={teams} />
    </div>
  );
}
