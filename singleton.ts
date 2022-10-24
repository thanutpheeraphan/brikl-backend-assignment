import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import prisma from './client'
import { MockContext, Context, createMockContext } from './libs/context'
import {mutation as mutations} from './services/user/resolvers/mutation'

let mockCtx: MockContext
let ctx: Context


jest.mock('./client', () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
	mockCtx = createMockContext()
	ctx = mockCtx as unknown as Context
	mockReset(prismaMock)
})

// test('should create a new list', async () => {
// 	const temp_list = {

// 		"id": "iuajbvuiabakvjabekjvb",
// 		"listName": "test_list",

// 	}
// 	mockCtx.prisma.llist.create.mockResolvedValue(temp_list)

// 	await expect(mutations?.createNewList?(temp_list,ctx): null).resolves.toEqual({
// 		"id": "iuajbvuiabakvjabekjvb",
// 		"listName": "test_list",
// 	})

// })


export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>