import { PrismaClient } from '@prisma/client'
import type { ExpressContext } from 'apollo-server-express'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

export interface Context {
  prisma: PrismaClient
}

export type MockContext = {
	prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
	return {
	  prisma: mockDeep<PrismaClient>(),
	}
  }

export function createContext(ctx: ExpressContext): Context {
  return {
    ...ctx,
    prisma: new PrismaClient(),
  }
}


