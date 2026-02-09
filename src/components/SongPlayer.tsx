"use client";

import { useState } from "react";
import { Play, Heart, MessageSquare, ExternalLink, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { likeSong } from "@/actions/songs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SongPlayerProps {
  song: {
    id: string;
    title: string;
    videoUrl: string;
    _count?: {
      likes: number;
      comments: number;
    };
  };
  teamColor: string;
}

export default function SongPlayer({ song, teamColor }: SongPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Extract YouTube ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(song.videoUrl);

  const handleLike = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setIsLiking(true);
    try {
      await likeSong(song.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="stadium-card group overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 group/btn"
          style={{ backgroundColor: teamColor }}
        >
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white group-hover/btn:opacity-40"></div>
          <Play fill="white" className="relative z-10 text-white ml-1" size={32} />
        </button>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h3 className="text-xl font-bold italic uppercase tracking-tight">{song.title}</h3>
          <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Heart size={14} /> {song._count?.likes || 0} Likes</span>
            <span className="flex items-center gap-1"><MessageSquare size={14} /> {song._count?.comments || 0} Comments</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={cn(
              "p-3 hover:bg-white/10 rounded-xl transition-colors text-white/40",
              isLiking && "opacity-50 pointer-events-none"
            )}
          >
            {isLiking ? <Loader2 size={20} className="animate-spin" /> : <Heart size={20} className="hover:text-red-500 transition-colors" />}
          </button>
          <button className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-white">
            <MessageSquare size={20} />
          </button>
          <a
            href={song.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-green-500"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {isPlaying && videoId && (
        <div className="aspect-video w-full bg-black border-t border-white/10">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={song.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
