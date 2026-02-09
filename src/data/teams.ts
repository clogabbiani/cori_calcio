import { prisma } from "@/lib/prisma";

export async function getTeams() {
  return await prisma.team.findMany({
    include: {
      league: true,
      country: true,
    },
  });
}

export async function getTeamBySlug(slug: string) {
  return await prisma.team.findUnique({
    where: { slug },
    include: {
      league: true,
      country: true,
      songs: {
        include: {
          _count: {
            select: { likes: true, comments: true },
          },
        },
      },
    },
  });
}

export async function getFeaturedTeams() {
  return await prisma.team.findMany({
    take: 6,
    include: {
      league: true,
    },
  });
}

export async function searchTeams(query: string) {
  return await prisma.team.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { league: { name: { contains: query } } },
        { country: { name: { contains: query } } },
      ],
    },
    include: {
      league: true,
      country: true,
    },
  });
}
