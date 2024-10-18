import { start } from './app'
import { prisma } from './db/prisma'

start()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async e => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
