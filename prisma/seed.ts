import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { hash } from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Create Admin User
  const adminPassword = await hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@coricalcio.com' },
    update: {},
    create: {
      email: 'admin@coricalcio.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Countries
  const england = await prisma.country.upsert({
    where: { slug: 'england' },
    update: {},
    create: { name: 'England', slug: 'england' },
  })

  const spain = await prisma.country.upsert({
    where: { slug: 'spain' },
    update: {},
    create: { name: 'Spain', slug: 'spain' },
  })

  const italy = await prisma.country.upsert({
    where: { slug: 'italy' },
    update: {},
    create: { name: 'Italy', slug: 'italy' },
  })

  const brazil = await prisma.country.upsert({
    where: { slug: 'brazil' },
    update: {},
    create: { name: 'Brazil', slug: 'brazil' },
  })

  // Leagues
  const premierLeague = await prisma.league.upsert({
    where: { slug: 'premier-league' },
    update: {},
    create: { 
      name: 'Premier League', 
      slug: 'premier-league',
      countryId: england.id
    },
  })

  const laLiga = await prisma.league.upsert({
    where: { slug: 'la-liga' },
    update: {},
    create: { 
      name: 'La Liga', 
      slug: 'la-liga',
      countryId: spain.id
    },
  })

  const serieA = await prisma.league.upsert({
    where: { slug: 'serie-a' },
    update: {},
    create: { 
      name: 'Serie A', 
      slug: 'serie-a',
      countryId: italy.id
    },
  })

  const brasileirao = await prisma.league.upsert({
    where: { slug: 'brasileirao' },
    update: {},
    create: { 
      name: 'Brasileirão', 
      slug: 'brasileirao',
      countryId: brazil.id
    },
  })

  // Teams & Songs
  
  // Liverpool
  const liverpool = await prisma.team.upsert({
    where: { slug: 'liverpool' },
    update: {},
    create: {
      name: 'Liverpool FC',
      slug: 'liverpool',
      primaryColor: '#c8102e',
      secondaryColor: '#f6eb61',
      leagueId: premierLeague.id,
      countryId: england.id,
    },
  })

  await prisma.song.upsert({
    where: { slug: 'you-ll-never-walk-alone-liverpool' },
    update: {},
    create: {
      title: "You'll Never Walk Alone",
      slug: 'you-ll-never-walk-alone-liverpool',
      videoUrl: 'https://www.youtube.com/watch?v=Go-jJl7I23I',
      teamId: liverpool.id,
      isOfficial: true,
    }
  })

  // Real Madrid
  const realMadrid = await prisma.team.upsert({
    where: { slug: 'real-madrid' },
    update: {},
    create: {
      name: 'Real Madrid CF',
      slug: 'real-madrid',
      primaryColor: '#ffffff',
      secondaryColor: '#febe10',
      leagueId: laLiga.id,
      countryId: spain.id,
    },
  })

  await prisma.song.upsert({
    where: { slug: 'hala-madrid-y-nada-mas' },
    update: {},
    create: {
      title: "¡Hala Madrid! ...y nada más",
      slug: 'hala-madrid-y-nada-mas',
      videoUrl: 'https://www.youtube.com/watch?v=0pL9K0xWn9E',
      teamId: realMadrid.id,
      isOfficial: true,
    }
  })

  // Juventus
  const juventus = await prisma.team.upsert({
    where: { slug: 'juventus' },
    update: {},
    create: {
      name: 'Juventus FC',
      slug: 'juventus',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      leagueId: serieA.id,
      countryId: italy.id,
    },
  })

  await prisma.song.upsert({
    where: { slug: 'juventus-storia-di-un-grande-amore' },
    update: {},
    create: {
      title: "Storia di un grande amore",
      slug: 'juventus-storia-di-un-grande-amore',
      videoUrl: 'https://www.youtube.com/watch?v=lH8S7o_Qf6o',
      teamId: juventus.id,
      isOfficial: true,
    }
  })

  // Flamengo
  const flamengo = await prisma.team.upsert({
    where: { slug: 'flamengo' },
    update: {},
    create: {
      name: 'CR Flamengo',
      slug: 'flamengo',
      primaryColor: '#c8102e',
      secondaryColor: '#000000',
      leagueId: brasileirao.id,
      countryId: brazil.id,
    },
  })

  await prisma.song.upsert({
    where: { slug: 'hino-do-flamengo' },
    update: {},
    create: {
      title: "Hino do Flamengo",
      slug: 'hino-do-flamengo',
      videoUrl: 'https://www.youtube.com/watch?v=pD4C82Xb-O0',
      teamId: flamengo.id,
      isOfficial: true,
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
