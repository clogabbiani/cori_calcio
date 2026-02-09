import { prisma } from "@/lib/prisma";

export async function getLeagues() {
  return await prisma.league.findMany({
    include: {
      country: true,
      _count: {
        select: { teams: true },
      },
    },
  });
}

export async function getLeagueBySlug(slug: string) {
  return await prisma.league.findUnique({
    where: { slug },
    include: {
      country: true,
      teams: true,
    },
  });
}
