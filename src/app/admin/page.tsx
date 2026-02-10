import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShieldCheck, Check, X, ExternalLink } from "lucide-react";
import { approveSubmission, rejectSubmission } from "@/actions/songs";

export default async function AdminDashboard() {
  const session = await auth();

  if ((session?.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

  const pendingSubmissions = await prisma.submission.findMany({
    where: { status: "PENDING" },
    include: {
      team: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-amber-500">
            <ShieldCheck size={32} />
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Admin Dashboard</h1>
          </div>
          <p className="text-white/50">Manage song submissions and platform content.</p>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold italic uppercase tracking-tight border-b border-white/10 pb-4">
          Pending Submissions ({pendingSubmissions.length})
        </h2>

        {pendingSubmissions.length > 0 ? (
          <div className="grid gap-4">
            {pendingSubmissions.map((submission) => (
              <div key={submission.id} className="stadium-card p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold uppercase italic">{submission.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">Team: <b className="text-white">{submission.team.name}</b></span>
                    <span className="flex items-center gap-1">Submitted by: <b className="text-white">{submission.user.name || submission.user.email}</b></span>
                  </div>
                  <a 
                    href={submission.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-green-500 text-sm font-bold hover:underline"
                  >
                    Preview Link <ExternalLink size={14} />
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <form action={async () => {
                    "use server";
                    await approveSubmission(submission.id);
                  }}>
                    <button className="bg-green-600 hover:bg-green-500 p-3 rounded-xl transition-all flex items-center gap-2 font-bold">
                      <Check size={20} /> Approve
                    </button>
                  </form>
                  <form action={async () => {
                    "use server";
                    await rejectSubmission(submission.id);
                  }}>
                    <button className="bg-red-600/20 hover:bg-red-600 p-3 rounded-xl transition-all text-red-500 hover:text-white flex items-center gap-2 font-bold">
                      <X size={20} /> Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-white/40 font-bold uppercase tracking-widest">No pending submissions.</p>
          </div>
        )}
      </section>
    </div>
  );
}
