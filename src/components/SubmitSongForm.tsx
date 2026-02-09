"use client";

import { useState } from "react";
import { Music, Send, Loader2, CheckCircle } from "lucide-react";
import { submitSong } from "@/actions/songs";

interface SubmitSongFormProps {
  teams: { id: string, name: string, league: { name: string } }[];
}

export default function SubmitSongForm({ teams }: SubmitSongFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      teamId: formData.get("teamId") as string,
      title: formData.get("title") as string,
      videoUrl: formData.get("videoUrl") as string,
    };

    if (!data.teamId || !data.title || !data.videoUrl) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      await submitSong(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit song.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="stadium-card p-12 text-center space-y-6">
        <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="text-green-500" size={40} />
        </div>
        <h2 className="text-2xl font-bold uppercase italic">Submission Received!</h2>
        <p className="text-white/50">Thank you for contributing. An admin will review your submission soon.</p>
        <button
          onClick={() => setSuccess(false)}
          className="text-green-500 font-bold hover:underline"
        >
          Submit another one
        </button>
      </div>
    );
  }

  return (
    <div className="stadium-card p-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm font-bold mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Select Team</label>
          <select
            name="teamId"
            required
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-green-500/50 appearance-none text-white"
          >
            <option value="">Select a team...</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name} ({team.league.name})</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Song Title</label>
          <input
            name="title"
            type="text"
            required
            placeholder="e.g. You'll Never Walk Alone"
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-green-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">YouTube/Video Link</label>
          <input
            name="videoUrl"
            type="url"
            required
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-green-500/50"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-white text-black py-5 rounded-xl font-black italic uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-500 transition-colors group disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Submit for Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
