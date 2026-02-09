"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Music, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md stadium-card p-8 space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tighter mb-4">
            <Music className="text-green-500" />
            <span>CORI <span className="text-green-500">CALCIO</span></span>
          </Link>
          <h1 className="text-3xl font-black italic uppercase tracking-tight">Welcome Back</h1>
          <p className="text-white/50">Login to like songs and join the conversation.</p>
        </div>

        {message && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-xl text-sm font-bold">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-white/40">
          Don't have an account? <Link href="/register" className="text-green-500 font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Suspense fallback={<div className="text-white/50">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
