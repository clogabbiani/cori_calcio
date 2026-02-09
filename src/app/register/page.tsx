"use client";

import { useState } from "react";
import Link from "next/link";
import { Music, Loader2 } from "lucide-react";
import { registerUser } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await registerUser(formData);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/login?message=Account created successfully");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md stadium-card p-8 space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tighter mb-4">
            <Music className="text-green-500" />
            <span>CORI <span className="text-green-500">CALCIO</span></span>
          </Link>
          <h1 className="text-3xl font-black italic uppercase tracking-tight">Create Account</h1>
          <p className="text-white/50">Join the community and support your team.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50"
              placeholder="Ultras"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50"
              placeholder="curva@nord.it"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50"
              placeholder="••••••••"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-600/20 mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-white/40">
          Already have an account? <Link href="/login" className="text-green-500 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
