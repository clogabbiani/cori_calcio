import { prisma } from "@/lib/prisma";

export async function getCountries() {
  return await prisma.country.findMany({
    include: {
      _count: {
        select: { teams: true },
      },
    },
  });
}

export async function getCountryBySlug(slug: string) {
  return await prisma.country.findUnique({
    where: { slug },
    include: {
      leagues: {
        include: {
          _count: {
            select: { teams: true },
          },
        },
      },
    },
  });
}
