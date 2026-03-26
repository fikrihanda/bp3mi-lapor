import process from 'node:process'
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from 'prisma/config'
import { PrismaClient } from '../prisma/client'

function prismaClientSingleton() {
  const adapter = new PrismaPg({
    connectionString: env('DATABASE_URL'),
  })
  return new PrismaClient({
    adapter,
  })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
