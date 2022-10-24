import { prisma } from '@prisma/client'
import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'
import { createNewList, createNewTask, updateTask, moveTask } from './mutator'

export type BatchPayload = {
	count: number
}

export const mutation: Resolvers<Context>['Mutation'] = {
	createUser: async (_parent, { input }, ctx) =>
		ctx.prisma.user.create({ data: input }),
	updateUser: async (_parent, { id, input }, ctx) =>
		ctx.prisma.user.update({
			where: { id },
			data: {
				username: input.username ?? undefined,
			},
		}),

	createNewList: async (_parent, { input }, ctx) => createNewList(input, ctx),
	createNewTask: async (_parent, { listID, input }, ctx) => createNewTask(listID, input, ctx),
	updateTask: async (_parent, { id, input }, ctx) => updateTask(id, input, ctx),
	moveTask: async (_parent, { id, input }, ctx) => moveTask(id, input, ctx)
}
